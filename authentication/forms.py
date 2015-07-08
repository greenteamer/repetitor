#-*- coding: utf-8 -*-
from django import forms
from authentication.models import Account, TeacherProfile, StudentProfile


my_default_errors = {
    'required': 'Это поле обязательно для заполнения',
    'invalid': 'Внесены некорректные данные'
}


class AccountForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(AccountForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget.attrs = {'placeholder':'Ваш email', 'class':'form-control'}
        self.fields['username'].widget.attrs = {'placeholder':'Имя пользователя', 'class':'form-control'}
        self.fields['password'].widget.attrs = {'placeholder':'Ваш пароль', 'class':'form-control'}
        self.fields['first_name'].widget.attrs = {'placeholder':'Ваше Имя', 'class':'form-control'}
        self.fields['last_name'].widget.attrs = {'placeholder':'Ваша Фамилия', 'class':'form-control'}
        self.fields['phone'].widget.attrs = {'placeholder':'Телефон', 'class':'form-control'}

    class Meta:
        model = Account
        fields = [
            'email',
            'username',
            'password',
            'first_name',
            'last_name',
            'phone'
        ]
        labels = {
            "email": u"",
            "username": u"",
            "password": u"",
            "first_name": u"",
            "last_name": u"",
            "phone": u"",
        }


class LoginForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget.attrs = {'placeholder':'Ваш email', 'class':'form-control'}
        self.fields['password'].widget.attrs = {'placeholder':'Ваш пароль', 'class':'form-control'}

    email = forms.EmailField(label='', max_length=30)
    password = forms.CharField(label='', max_length=50, widget=forms.PasswordInput())


class RegisterForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget.attrs = {'placeholder':'Ваш email', 'class':'form-control'}
        self.fields['username'].widget.attrs = {'placeholder':'Имя пользователя', 'class':'form-control'}
        self.fields['password'].widget.attrs = {'placeholder':'Ваш пароль', 'class':'form-control', 'type':'password'}
        self.fields['first_name'].widget.attrs = {'placeholder':'Ваше Имя', 'class':'form-control'}
        self.fields['patronymic'].widget.attrs = {'placeholder':'Ваше Отчество', 'class':'form-control'}
        self.fields['last_name'].widget.attrs = {'placeholder':'Ваша Фамилия', 'class':'form-control'}
        self.fields['phone'].widget.attrs = {'placeholder':'Телефон', 'class':'form-control'}

    email = forms.EmailField(label='', max_length=30)
    username = forms.CharField(label='', max_length=50)
    password = forms.CharField(label='', max_length=50, widget=forms.PasswordInput())
    first_name = forms.CharField(label='', max_length=50)
    patronymic = forms.CharField(label='', max_length=50)
    last_name = forms.CharField(label='', max_length=50)
    phone = forms.CharField(label='', max_length=50)


class TeacherProfileForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(TeacherProfileForm, self).__init__(*args, **kwargs)
        self.fields['subject'].widget.attrs = {'placeholder':'Предмет', 'class':'form-control'}
        self.fields['skill'].widget.attrs = {'placeholder':'Преподовательский опыт', 'class':'form-control'}
        self.fields['price'].widget.attrs = {'placeholder':'Стоимость урока (45 мин)', 'class':'form-control'}
        self.fields['photo'].widget.attrs = {'class':'form-control'}

    class Meta:
        model = TeacherProfile
        exclude = ('account',)

        labels = {
            "subject": u"",
            "skill": u"",
            "price": u"",
            "photo": u"Ваша фотография",
        }

    def save(self, account):
        obj = super(TeacherProfileForm, self).save(commit=False)
        obj.account = account
        return obj.save()


class StudentProfileForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(StudentProfileForm, self).__init__(*args, **kwargs)
        self.fields['age'].widget.attrs = {'placeholder':'Возраст учащегося', 'class':'form-control'}

    class Meta:
        model = StudentProfile
        exclude = ('account',)

        labels = {
            "age": u"",
        }

    def save(self, account):
        obj = super(StudentProfileForm, self).save(commit=False)
        obj.account = account
        return obj.save()
