from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator
from datasense_api.models import UserData
from .serializers import UserDataSerializer
from rest_framework.decorators import api_view, permission_classes,parser_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def menu_items_list(request):
    menu_items = UserData.objects.all().order_by('-uploaded_at')  
    page_number = request.query_params.get('page', default = 1)
    paginator = Paginator(menu_items, per_page=10)  
 
    page_obj = paginator.get_page(page_number)

    serializer = UserDataSerializer(page_obj, many=True)
    print(serializer.data)
    
    return Response(
      serializer.data
    , status=status.HTTP_200_OK)