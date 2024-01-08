from django.db import models

# Create your models here.

class MyBeers(models.Model):
    title = models.CharField('Название', max_length=50)
    brewery = models.CharField('Производитель', max_length=250)
    rating = models.IntegerField('Оценка')
    photo = models.ImageField('Фото', upload_to='images')
    description = models.TextField('Описание')
    date = models.DateField('Дата публикации')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Пиво'
        verbose_name_plural = 'Пива'