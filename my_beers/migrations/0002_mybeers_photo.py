# Generated by Django 5.0 on 2024-01-06 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_beers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='mybeers',
            name='photo',
            field=models.ImageField(default=0, upload_to='images', verbose_name='Фото'),
            preserve_default=False,
        ),
    ]
