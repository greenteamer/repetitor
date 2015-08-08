# -*- coding: utf-8 -*-
import datetime
import pytz
from models import Order, Offer
import sys

reload(sys)
sys.setdefaultencoding('utf8')

def create_order(teacher, student, announcement):
    """функция создания заказа со всеми необходимыми проверками
    функция сохраняет в базу новый заказ
    если время с момента создания последнего заказа меньше 3 дней заказ не будет создан
    функция возвращает сообщение которое в итоге выводится пользователю"""
    message = ''
    try:
        tmp_last_order = Order.objects.filter(teacher=teacher, student=student).order_by('-date')[0]
        new_date = pytz.UTC.localize(datetime.datetime.now())
        difference = new_date - tmp_last_order.date
        if difference.days > 2:
            """создаем заказ если разница между датами больше 2 дней"""
            order = Order()
            order.teacher = teacher
            order.student = student
            order.subject = teacher.subject
            order.price = teacher.price * 2
            order.save()
            order.announcement.add(announcement)            
            message = 'Ваша заявка отправлена репетитору, ожидайте ответа.'
        else:
            message = 'Ваша заявка не отправлена репетитору так как Вы\
            создавали заявку данному репетитору не позднее чем 3 дня назад,\
            мы намеренно даем время репетитору на обдумываение заявки, если Вам\
            необходим репетитор срочно, попробуйте найти на нашем сайте\
            еще одного репетитора, возможно он ответит быстрее.\
            Спасибо за понимание!'
    except:
        order = Order()
        order.teacher = teacher
        order.student = student
        order.subject = teacher.subject
        order.price = teacher.price * 2
        order.save()
        message = 'Ваша заявка отправлена репетитору, ожидайте ответа.'

    return message


def create_offer(teacher, student, announcement):
    """функция создания заявки со всеми необходимыми проверками
    функция сохраняет в базу новую заявку
    если время с момента создания последней заявки меньше 3 дней заявка не будет создана
    функция возвращает сообщение которое в итоге выводится пользователю"""
    message = ''
    try:
        tmp_last_offer = Offer.objects.filter(teacher=teacher, student=student, announcement=announcement).order_by('-date')[0]
        new_date = pytz.UTC.localize(datetime.datetime.now())
        difference = new_date - tmp_last_offer.date
        if difference.days > 2:
            """создаем заявку если разница между датами больше 3 дней"""
            offer = Offer()
            offer.teacher = teacher
            offer.student = student
            offer.save()
            offer.announcement.add(announcement)
            message = 'Ваше предоложение отправлено ученику, ожидайте ответа.'
        else:
            message = 'Ваше предложение не отправлено ученику так как Вы\
            отправляли предложение данному ученику не позднее чем 3 дня назад,\
            мы намеренно даем время ученику на обдумываение предложения,\
            попробуйте найти на нашем сайте еще предложения по Вашему предмету,\
            возможно Вам ответят быстрее.\
            Спасибо за понимание!'
    except:
        offer = Offer()
        offer.teacher = teacher
        offer.student = student
        offer.save()
        offer.announcement.add(announcement)
        message = 'Ваше предоложение отправлено ученику, ожидайте ответа.'

    return message
