from django.shortcuts import render

def index(request):
   return render(request, "index.html", {})
def initmap(request):
    return render(request, "map.html", {})
def category(request):
    return render(request, "categories0.html", {})
def fun(request):
    return render(request, "fun.html", {})
def party(request):
    return render(request, "party.html", {})
def foodAndDrinks(request):
    return render(request, "foodAndDrinks.html", {})
def directions(request):
    return render(request, "directions.html", {})
def directPres(request):
    return render(request, "directionsPreset.html", {})
def home(request):
    return render(request, "home.html", {})
