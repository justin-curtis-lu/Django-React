from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from jobs.models import Job
from jobs.serializers import JobSerializer
from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def job_list(request):
    """ API endpoint on GET: returns all jobs / jobs by position name
                     on POST: adds a job
                     on DELETE: deletes all jobs"""
    if request.method == 'GET':
        jobs = Job.objects.all()
        position = request.GET.get('position', None)
        if position is not None:
            jobs = Job.objects.filter(position__icontains=position)
        jobs_serializer = JobSerializer(jobs, many=True)
        return JsonResponse(jobs_serializer.data, safe=False)
    elif request.method == 'POST':
        job_data = JSONParser().parse(request)
        job_serializer = JobSerializer(data=job_data)
        if job_serializer.is_valid():
            job_serializer.save()
            return JsonResponse(job_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(job_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        count = Job.objects.all().delete()
        return JsonResponse({'message': '{} Jobs were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def job_detail(request, pk):
    """ API endpoint on GET: gets a job by ID
                     on PUT: updates a job by ID
                     on DELETE: deletes a job by ID"""
    try:
        job = Job.objects.get(pk=pk)
    except Job.DoesNotExist:
        return JsonResponse({'message': 'The job does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        job_serializer = JobSerializer(job)
        return JsonResponse(job_serializer.data)
    elif request.method == 'PUT':
        job_data = JSONParser().parse(request)
        job_serializer = JobSerializer(job, data=job_data)
        if job_serializer.is_valid():
            job_serializer.save()
            return JsonResponse(job_serializer.data)
        return JsonResponse(job_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        job.delete()
        return JsonResponse({'message': 'Job was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def job_list_accepted(request):
    """ API endpoint returns all jobs that have an offer """
    jobs = Job.objects.filter(offer=True)
    if request.method == 'GET':
        jobs_serializer = JobSerializer(jobs, many=True)
        return JsonResponse(jobs_serializer.data, safe=False)


@api_view(['GET'])
def job_list_pending(request):
    """ API endpoint returns all jobs that are pending or declined """
    jobs = Job.objects.filter(offer=False)
    if request.method == 'GET':
        jobs_serializer = JobSerializer(jobs, many=True)
        return JsonResponse(jobs_serializer.data, safe=False)
