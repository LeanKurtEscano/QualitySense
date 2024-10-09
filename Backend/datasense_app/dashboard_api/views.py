from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator
from datasense_api.models import UserData, UserResults
from .serializers import UserDataSerializer,UserResultsSerializer
from rest_framework.decorators import api_view, permission_classes,parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def menu_items_list(request):
    
    menu_items = UserData.objects.filter(user=request.user).order_by('-uploaded_at')

    page_number = request.query_params.get('page', default=1)  
    paginator = Paginator(menu_items, per_page=10)  

    page_obj = paginator.get_page(page_number)  

    serializer = UserDataSerializer(page_obj, many=True)  

    return Response(
        {
            'data': serializer.data, 
            'totalItems': paginator.count,  
            'itemsPerPage': paginator.per_page,  
            'currentPage': page_obj.number,  
            'totalPages': paginator.num_pages,  
        },
        status=status.HTTP_200_OK
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def generated_data(request):
    user = UserResults.objects.filter(user = request.user).order_by('-generated_at')
    page_number = request.query_params.get('page', default = 1)
    paginator = Paginator(user, per_page = 10)
    page_data = paginator.get_page(page_number)
    serializer = UserResultsSerializer(page_data, many = True)
    
    return Response({
        'data': serializer.data,
        'totalItems': paginator.count,  
        'itemsPerPage': paginator.per_page,  
        'currentPage': page_data.number,  
        'totalPages': paginator.num_pages,  
    },status=status.HTTP_200_OK)    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_generated(request):
    gen_id = request.data.get('id')
    user = UserResults.objects.get(id=gen_id, user= request.user)
    user.delete()
    return Response({"Success": "Data Deleted"}, status=status.HTTP_200_OK)