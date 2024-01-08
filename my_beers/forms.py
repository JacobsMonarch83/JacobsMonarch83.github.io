from .models import MyBeers
from django.forms import ModelForm, TextInput, DateInput, Textarea, FileInput


class MyBeersForm(ModelForm):
    
    class Meta:
        model = MyBeers
        fields = ['title', 'brewery', 'rating', 'photo', 'description', 'date']

        widgets = {
            'title': TextInput(attrs={
                'placeholder': 'Введите название пива',
                'class': 'form-control',
            }),
            'brewery': TextInput(attrs={
                'placeholder': 'Укажите производителя',
                'class': 'form-control'
            }),
            'rating': TextInput(attrs={
                'placeholder': 'Оцените от 1 до 10',
                'class': 'form-control'
            }),
            'photo': FileInput(attrs={
                'placeholder': 'Фото',
                'class': 'form-control'
            }),
            'description': Textarea(attrs={
                'placeholder': 'Оставьте комментарий',
                'class': 'form-control'
            }),
            'date': DateInput(attrs={
                'placeholder': 'Укажите дату',
                'class': 'form-control'
            })
        }