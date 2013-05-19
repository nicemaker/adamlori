from django import forms

class ContactForm(forms.Form):
    sender = forms.EmailField( widget=forms.TextInput(attrs={'placeholder': 'Your Email'}) )
    message = forms.CharField( label="Message", widget=forms.Textarea(attrs={'placeholder': 'Your Message'}) )

