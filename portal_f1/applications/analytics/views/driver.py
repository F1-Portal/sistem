from datetime import date

import pandas as pd
from django.db.models import FloatField, Value, IntegerField, Min, CharField
from django.views.generic.list import ListView
from analytics.filters.driver import DriverFilter
from analytics.models.drivers import Driver
from analytics.models.races import Race
from analytics.models.results import Result


from django.views.generic import DetailView

from analytics.models.qualifying import Qualifying
from rest_framework.response import Response
from rest_framework.views import APIView


class DriverDetailView(DetailView):
    template_name = 'driver/driver_detail.html'
    model = Driver

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        return context
    def get_object(self, queryset=None):
        driver = Driver.objects.get(pk=self.kwargs["pk"])
        results = Result.objects.filter(driver=driver)
        pole = Qualifying.objects.filter(driver=driver, position=1)
        completed_races = 0
        first_places = 0
        second_places = 0
        third_places = 0
        for result in results:
            if result.status.id == 1:
                if result.position == 1:
                    first_places += 1
                elif result.position == 2:
                    second_places += 1
                elif result.position == 3:
                    third_places += 1


                completed_races += 1

        data = {
            "pole": len(pole),
            "driver": driver,
            "total_races":len(results),
            "completed_races": completed_races,
            "first_places": first_places,
            "second_places": second_places,
            "third_places": third_places
                }

        return data


class DriverDetailAPIView(APIView):
    def get(self, request, format=None):
        driver = Driver.objects.get(pk=int(request.GET.get('driver')))

        results = pd.DataFrame(list(Result.objects.filter(driver=driver).values('position', 'race__year')))
        poles = pd.DataFrame(list(Qualifying.objects.filter(driver=driver, position=1).values('race__year')))

        start_year = results['race__year'].min()
        end_year = results['race__year'].max()

        years = []
        for i in range(start_year, end_year + 1):
            years.append(int(i))

        poles = poles.value_counts("race__year").reset_index(name='poles')
        poles = poles.sort_values('race__year')

        poles_year = []
        for year in years:
            try:
                poles_year.append(poles.loc[poles['race__year'] == int(year), 'poles'].iloc[0])
            except IndexError as e:
                poles_year.append(0)

        poles_by_year = [{'x': date(int(years[i]), 1, 1), 'y': poles_year[i]} for i in range(0, len(years))]

        data = []
        data.append(poles_by_year)
        labels = ['Poles']

        data = {
            "data": data,
            "labels": labels
        }
        return Response(data)


class DriverList(ListView):
    model = Driver
    template_name = 'driver/driver_list.html'
    paginate_by = 10
    permission_required = 'analytics.view_driver'

    def dispatch(self, request, *args, **kwargs):
        return super(DriverList, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filter'] = DriverFilter(self.request.GET, queryset=self.get_queryset())
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        data = DriverFilter(self.request.GET, queryset=queryset).qs
        data = data.annotate(period=Value("None", output_field=CharField()))

        for driver in data:
            start = Result.objects.filter(driver=driver).order_by("race__year").values("race__year")
            year_start = start[0]["race__year"]
            year_final = start[len(start)-1]["race__year"]
            driver.period = str(year_start) + " - " + str(year_final)



        return data