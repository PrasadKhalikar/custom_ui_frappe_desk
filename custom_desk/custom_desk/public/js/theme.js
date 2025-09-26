frappe.boot ? apply_theme_if_enabled() : frappe.after_ajax(apply_theme_if_enabled);

function apply_theme_if_enabled() {
    frappe.db.get_single_value('Theme Settings', 'enabled').then(enabled => {
        if (!enabled) return;

        frappe.call({
            method: 'frappe.client.get',
            args: {
                doctype: 'Theme Settings',
                name: 'Theme Settings'
            },
            callback(res) {
                if (res.message) {
                    apply_theme(res.message);
                }
            }
        });
    });
}

function apply_theme(doc) {
    remove_theme();

    const style = document.createElement('style');
    style.id = 'custom-theme-style';
    style.innerHTML = `
        :root {
            --primary-color: ${doc.primary_button_color};
            --secondary-color: ${doc.secondary_button_color};
            --danger-color: ${doc.danger_button_color};
            --light-color: ${doc.light_button_color};
            --sidebar-bg: ${doc.sidebar_background};
            --topbar-bg: ${doc.topbar_background};
            --card-bg: ${doc.card_background};
            --table-bg: ${doc.table_background};
            --page-bg: ${doc.background_color};
            --font-family: ${doc.font_family};
            --label-color: ${doc.label_color};
            --section-bg: ${doc.section_bg_color};
            --form-border: ${doc.form_border_color};
            --hover-color: ${doc.hover_color};
            --card-radius: ${doc.card_border_radius};
            --card-shadow: ${doc.card_shadow_style};
            --page-head-bg: ${doc.page_head_background};
            --table-head-bg: ${doc.table_head_background};
            --alt-row-bg: ${doc.alt_row_background};
        }

        .btn-primary {
            background-color: var(--primary-color) !important;
            border-color: var(--primary-color) !important;
            color: #fff !important;
        }

        .btn-secondary {
            background-color: var(--secondary-color) !important;
            border-color: var(--secondary-color) !important;
            color: #fff !important;
        }

        .btn-danger {
            background-color: var(--danger-color) !important;
            border-color: var(--danger-color) !important;
            color: #fff !important;
        }

        .btn-light {
            background-color: var(--light-color) !important;
            border-color: var(--light-color) !important;
            color: #000 !important;
        }

        .sidebar, .app-sidebar, .layout-side-section, #sidebar-menu {
            background-color: var(--sidebar-bg) !important;
        }

        .navbar, .navbar-default, #navbar-breadcrumbs {
            background-color: var(--topbar-bg) !important;
        }

        .frappe-card, .widget, .module-card {
            background-color: var(--card-bg) !important;
            border-radius: var(--card-radius);
            box-shadow: var(--card-shadow);
        }

        .grid, .frappe-list, .datatable {
            background-color: var(--table-bg) !important;
        }

        body, .page-container {
            background-color: var(--page-bg) !important;
            font-family: var(--font-family), sans-serif !important;
        }

        label, .control-label, .grid-heading {
            color: var(--label-color) !important;
        }

        .form-section, .section-head {
            background-color: var(--section-bg) !important;
        }

        .form-control, .grid-row, .frappe-control {
            border-color: var(--form-border) !important;
        }

        .sidebar .standard-sidebar-section:hover {
            background-color: var(--hover-color) !important;
        }

        .page-head {
            background-color: var(--page-head-bg) !important;
        }

        .grid-heading-row, .grid-heading {
            background-color: var(--table-head-bg) !important;
            color: var(--label-color) !important;
            border-bottom: 1px solid var(--form-border) !important;
        }

        .grid-body .grid-row:nth-child(even) {
            background-color: var(--alt-row-bg) !important;
        }
    `;
    document.head.appendChild(style);
}

function remove_theme() {
    const old_style = document.getElementById('custom-theme-style');
    if (old_style) old_style.remove();
}
