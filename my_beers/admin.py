from django.contrib import admin
from .models import MyBeers

# Register your models here.

admin.site.register(MyBeers)

""" class TestAdmin(admin.ModelAdmin):
    readonly_fields = ('date', ) """