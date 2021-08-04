from django import forms

class BookForm(forms.Form):
    book = forms.FileField(
        label = 'Select a book',
        help_text='업로드 할 책을 골라주세요'
    )