from django.shortcuts import render

# Create your views here.

def index(request, path=''):
    """
    The home page. This renders the container for the single-page app.
    """
    return render(request, 'index.html')
