from django.shortcuts import render, redirect
from .models import MyBeers
from .forms import MyBeersForm
from main.views import menu, data

# Create your views here.

def my_beers(request):
    
    data['title'] = menu[2]['link_title']
    data['my_beers'] = MyBeers.objects.order_by('-date')
    
    return render(request, 'my_beers/my_beers.html', data)

def check_in(request):
    
    form = MyBeersForm()
    data['title'] = menu[3]['link_title']
    data['form'] = form
    data['error'] = ''
        
    if request.method == 'POST':
        form = MyBeersForm(request.POST, request.FILES)
        data['form'] = form
        if form.is_valid():
            form.save()
            return redirect('my_beers')
        else:
            data['error'] = 'Форма невалидна!'

    return render(request, 'my_beers/check_in.html', data)

def auth(request):
    
    data['title'] = menu[4]['link_title']
    
    return render(request, 'my_beers/auth.html', data)
