from django import forms

class ContactForm(forms.Form):
    subject = forms.CharField(max_length=100, label="Subject", widget=forms.TextInput(attrs={'placeholder': 'Subject'}) )
    message = forms.CharField( label="Message", widget=forms.Textarea(attrs={'placeholder': 'Your Message'}) )
    sender = forms.EmailField( widget=forms.TextInput(attrs={'placeholder': 'Your Email'}) )
    cc_myself = forms.BooleanField(required=False)
    
