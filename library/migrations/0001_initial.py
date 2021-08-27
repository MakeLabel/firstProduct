# Generated by Django 3.2.5 on 2021-08-12 07:16

from django.db import migrations, models
import django.utils.timezone
# Generated by Django 3.2.6 on 2021-08-24 16:07


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256, null=True)),
                ('brief_description', models.CharField(max_length=256, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Highlight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('highlight_color', models.CharField(max_length=256, null=True)),
                ('highlight_text', models.TextField()),
                ('highlight_location', models.CharField(max_length=256, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=255)),
                ('document', models.FileField(upload_to='documents/%Y/%m/%d')),
                ('cover', models.ImageField(blank=True, null=True, upload_to='covers/%Y/%m/%d/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
