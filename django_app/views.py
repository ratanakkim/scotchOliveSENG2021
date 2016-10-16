from django.shortcuts import render

def index(request):
   return render(request, "index.html", {})
def initmap(request):
    return render(request, "map.html", {})
def categories0(request):
    return render(request, "categories0.html", {})
