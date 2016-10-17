"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django_app.views import index
from django_app.views import initmap
from django_app.views import category
from django_app.views import fun
from django_app.views import party
from django_app.views import foodAndDrinks
from django_app.views import directions
urlpatterns = [
    url(r'^$', index, name = 'index'),
    url(r'^map/$', initmap , name = 'initmap'),
    url(r'^map\?idType=<placeType>\w+', initmap , name = 'initmap'),
    url(r'^category/$', category , name = 'category'),
    url(r'^category/fun.html$', fun , name = 'fun'),
    url(r'^category/party.html$', party , name = 'party'),
    url(r'^category/foodAndDrinks.html$', foodAndDrinks , name = 'eats'),
    url(r'^directions/$', directions , name = 'directions'),
]
