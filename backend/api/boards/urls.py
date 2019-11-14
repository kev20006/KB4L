'''
url config for routes starting with /api/boards/
'''
from django.urls import path
from .views import(
    board_by_user,
    is_member,
    board_by_url,
    board_by_id,
    member_by_board,
    add_member_list_board,
    add_user_by_board_code
) 

urlpatterns = [
    path('member', is_member),
    path('member/<str:board_id>', member_by_board),
    path('username/<str:username>', board_by_user),
    path('url/<str:url>', board_by_url),
    path('id/<str:id>', board_by_id),
    path('members', add_member_list_board),
    path('members/new', add_user_by_board_code)
]
