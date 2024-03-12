from django.urls import path
from analytics.views.sistem import SistemIndexView
from analytics.views.driver import DriverList
from analytics.views.driver import DriverDetailView

urlpatterns = [
    path('analytics', SistemIndexView.as_view(), name="analytics"),
    path('analytics/list/driver', DriverList.as_view(), name='driver_list'),
    path('driver/<int:pk>/detail', DriverDetailView.as_view(), name='detail')

]
