from django.db import models
from analytics.models.circuits import Circuit



class Race(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name="Race ID", null=False, blank=False)
    year = models.IntegerField(verbose_name="Year", blank=False, null=False)
    round = models.IntegerField(verbose_name="Round", blank=False, null=False)
    name = models.CharField(max_length=100, verbose_name= "GP Name", blank=False, null=False)
    date = models.DateField(verbose_name="Date", blank=False, null=False)
    time = models.TimeField(verbose_name="Time", blank=False, null=True)
    url = models.CharField(max_length=250, verbose_name="Race Url", blank=False, null=False)
    fp1_date = models.DateField(verbose_name="FP1 Date", blank=True, null=True)
    fp1_time = models.TimeField(verbose_name="FP1 Time", blank=True, null=True)
    fp2_date = models.DateField(verbose_name="FP2 Date", blank=True, null=True)
    fp2_time = models.TimeField(verbose_name="FP2 Time", blank=True, null=True)
    fp3_date = models.DateField(verbose_name="FP3 Date", blank=True, null=True)
    fp3_time = models.TimeField(verbose_name="FP3 Time", blank=True, null=True)
    quali_date = models.DateField(verbose_name="Quali Date", blank=True, null=True)
    quali_time = models.TimeField(verbose_name="Quali Time", blank=True, null=True)
    sprint_date = models.DateField(verbose_name="Sprint Date", blank=True, null=True)
    sprint_time = models.TimeField(verbose_name="Sprint Time", blank=True, null=True)
    circuit = models.ForeignKey(Circuit, on_delete=models.PROTECT, verbose_name="Circuit ID", blank=False, null=False)

    def __str__(self):
        return '{} - {}'.format(self.year, self.name)


    class Meta:
        verbose_name_plural = "Races"


