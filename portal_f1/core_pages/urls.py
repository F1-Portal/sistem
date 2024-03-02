from django.urls import path
from core_pages.views.index import IndexView, IndexSystemView


urlpatterns = [
    #endereço, minha view.as_view()., nome da url
    path('', IndexView.as_view(), name='index'),
    path('inicio', IndexSystemView.as_view(), name='inicio'),
    # path('equipenocs/', EquipeView.as_view(), name='equipe'),
]
