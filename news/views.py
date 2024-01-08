from django.shortcuts import render
from .models import Articles
from main.views import menu, data

# Create your views here.

def news(request):
    
    data['title'] = menu[1]['link_title']
    data['news'] = Articles.objects.order_by('-date')
    
    return render(request, 'news/news.html', data)
