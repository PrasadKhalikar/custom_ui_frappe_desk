import frappe

def inject_theme_settings(bootinfo):
    if not frappe.db.get_single_value("Theme Settings", "enabled"):
        return

    doc = frappe.get_doc("Theme Settings", "Theme Settings").as_dict()

    bootinfo.custom_theme_settings = {k: doc[k] for k in doc if isinstance(doc[k], str) or isinstance(doc[k], int)}
