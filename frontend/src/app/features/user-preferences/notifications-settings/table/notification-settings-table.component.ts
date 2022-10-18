// noinspection ES6UnusedImports

import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { PathHelperService } from 'core-app/core/path-helper/path-helper.service';
import { I18nService } from 'core-app/core/i18n/i18n.service';
import idFromLink from 'core-app/features/hal/helpers/id-from-link';
import { HalSourceLink } from 'core-app/features/hal/resources/hal-resource';

@Component({
  selector: 'op-notification-settings-table',
  templateUrl: './notification-settings-table.component.html',
  styleUrls: ['./notification-settings-table.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationSettingsTableComponent {
  @Input() userId:string;

  @Input() settings:UntypedFormArray;

  text = {
    notify_me: this.I18n.t('js.notifications.settings.notify_me'),
    save: this.I18n.t('js.button_save'),
    mentioned_header: {
      title: this.I18n.t('js.notifications.settings.reasons.mentioned.title'),
      description: this.I18n.t('js.notifications.settings.reasons.mentioned.description'),
    },
    assignee: this.I18n.t('js.notifications.settings.reasons.assignee'),
    responsible: this.I18n.t('js.notifications.settings.reasons.responsible'),
    watched_header: this.I18n.t('js.notifications.settings.reasons.watched'),
    work_package_commented_header: this.I18n.t('js.notifications.settings.reasons.work_package_commented'),
    work_package_created_header: this.I18n.t('js.notifications.settings.reasons.work_package_created'),
    work_package_processed_header: this.I18n.t('js.notifications.settings.reasons.work_package_processed'),
    work_package_prioritized_header: this.I18n.t('js.notifications.settings.reasons.work_package_prioritized'),
    work_package_scheduled_header: this.I18n.t('js.notifications.settings.reasons.work_package_scheduled'),
    remove_project_settings: this.I18n.t('js.notifications.settings.project_specific.remove'),
  };

  constructor(
    private I18n:I18nService,
    private pathHelper:PathHelperService,
  ) {}

  projectLink(href:string) {
    return this.pathHelper.projectPath(idFromLink(href));
  }

  addProjectSettings(project:HalSourceLink):void {
    this.settings.push(new UntypedFormGroup({
      project: new UntypedFormControl(project),
      assignee: new UntypedFormControl(false),
      responsible: new UntypedFormControl(false),
      workPackageCreated: new UntypedFormControl(false),
      workPackageProcessed: new UntypedFormControl(false),
      workPackageScheduled: new UntypedFormControl(false),
      workPackagePrioritized: new UntypedFormControl(false),
      workPackageCommented: new UntypedFormControl(false),
    }));
  }

  removeProjectSettings(index:number):void {
    this.settings.removeAt(index);
  }
}
