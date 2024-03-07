from django.db.models import FloatField, Value, IntegerField, Min, CharField
from django.views.generic.list import ListView
from analytics.filters.driver import DriverFilter
from analytics.models.drivers import Driver
from analytics.models.races import Race
from analytics.models.results import Result


class DriverList(ListView):
    model = Driver
    template_name = 'drivers/driver.html'
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