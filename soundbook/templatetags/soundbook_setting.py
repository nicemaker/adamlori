from django import template
from soundbook.models import NameValue

register = template.Library()


@register.simple_tag
def val_by_name(name):
    setting = NameValue.objects.get( name=name)
    return '' if setting is None else setting.val 