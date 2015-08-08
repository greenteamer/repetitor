# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('relationships', '0004_order_id_paid'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.TextField(verbose_name='\u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439')),
                ('account', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('order', models.ForeignKey(to='relationships.Order')),
            ],
        ),
    ]
