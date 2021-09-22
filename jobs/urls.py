from django.conf.urls import url
from jobs import views

urlpatterns = [
    url(r'^api/jobs$', views.job_list),
    url(r'^api/jobs/(?P<pk>[0-9]+)$', views.job_detail),
    url(r'^api/jobs/accepted$', views.job_list_accepted),
    url(r'^api/jobs/pending$', views.job_list_pending)
]