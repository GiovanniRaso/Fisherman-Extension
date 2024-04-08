from django.db import models

class Domain(models.Model):
    url = models.URLField(unique=True)
    
    SAFE = 0
    SUSPICIOUS = 1
    MALICIOUS = 2
    STATUS_CHOICES = [
        (SAFE, 'Safe'),
        (SUSPICIOUS, 'Suspicious'),
        (MALICIOUS, 'Malicious'),
    ]
    
    status = models.IntegerField(choices=STATUS_CHOICES, default=SAFE)
    
    def __str__(self):
        return f"{self.url} - {self.get_status_display()}"
    
