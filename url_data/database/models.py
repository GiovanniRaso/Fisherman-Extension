from django.db import models

class UrlData(models.model):
    url = models.URLField(max_length=2048, unique=True)
    GRADE_CHOICES = [
        (0, 'Safe'),
        (1, 'Suspicious'),
        (3, 'Malicious'),
    ]
    grade = models.IntegerField(choices=GRADE_CHOICES, default=0)

    def __str__(self):
        return f"{self.url} - {self.get_grade_display()}"