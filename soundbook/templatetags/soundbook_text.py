from django import template
from soundbook.models import TextField

register = template.Library()

@register.simple_tag
def text_by_name(name):
    text = TextField.objects.get( name=name);
    return '' if text is None else text.body 