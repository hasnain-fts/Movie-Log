from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_id = models.IntegerField()        # TMDB movie ID
    title = models.CharField(max_length=255)
    poster_path = models.CharField(max_length=255)
    release_date = models.CharField(max_length=20)
    overview = models.TextField(blank=True)

    class Meta:
        unique_together = ('user', 'movie_id')   # no duplicate favorites

    def __str__(self):
        return f"{self.user.username} → {self.title}"