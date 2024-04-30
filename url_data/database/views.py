from django.http import JsonResponse
from .models import UrlData

def check_url(request):
    # Get the URL parameter from the request
    url_to_check = request.GET.get('url', '')

    # Query the database for the URL
    try:
        url_data = UrlData.objects.get(url=url_to_check)
        return JsonResponse({
            'is_phishing': True,
            'url': url_data.url,
            'grade': url_data.get_grade_display()
        })
    except UrlData.DoesNotExist:
        # If the URL is not found in the database, consider it not checked/safe or add your logic
        return JsonResponse({'is_phishing': False, 'url': url_to_check, 'grade': 'Not Checked'})

    except UrlData.MultipleObjectsReturned:
        # Handle the unlikely case where the same URL is entered more than once
        return JsonResponse({'error': 'Multiple entries found for the same URL'}, status=500)
