from django.shortcuts import render

# Create your views here.

menu = [{'link_title': 'Главная страница', 'url_name': 'home'},
        {'link_title': 'Новости', 'url_name': 'news'},
        {'link_title': 'Мои пива', 'url_name': 'my_beers'},
        {'link_title': 'Чек-ин', 'url_name': 'check_in'},
        {'link_title': 'Войти', 'url_name': 'auth'}
]

data = {'menu': menu, }

def index(request):
    
    data['title'] = menu[0]['link_title']

    return render(request, 'main/index.html', data)

def contacts(request):
    
    data['title'] = 'Контакты'

    return render(request, 'main/contacts.html',  data)
