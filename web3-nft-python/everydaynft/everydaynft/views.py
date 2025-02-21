from django.shortcuts import render
from django.http import JsonResponse

def sample_api(request):
    data = {
        "message": "Hello from Django!",
        "status": "success"
    }
    return JsonResponse(data)
def index(request):
    return render(request, 'index.html')
