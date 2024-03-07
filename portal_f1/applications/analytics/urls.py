from django.urls import path
from analytics.views.sistem import SistemIndexView
from analytics.views.driver import DriverList

urlpatterns = [
    path('sistem', SistemIndexView.as_view(), name="analytics"),
    path('pilotos', DriverList.as_view(), name='driver'),

]
