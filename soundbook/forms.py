from django import forms

class ContactForm(forms.Form):
    subject = forms.CharField( widget = forms.HiddenInput(attrs={'value': 'Contact Request'} ) )
    sender = forms.EmailField( widget=forms.TextInput(attrs={'placeholder': 'Your Email','type': 'email'}) )
    message = forms.CharField( label="Message", widget=forms.Textarea(attrs={'placeholder': 'Your Message'}) )
    

