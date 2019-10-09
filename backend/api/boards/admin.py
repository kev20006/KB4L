from django.contrib import admin
from .models import Board, Member, Recent_Activity
# Register your models here.

admin.site.register(Board)
admin.site.register(Member)
admin.site.register(Recent_Activity)
