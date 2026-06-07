"use client";

import type { Field } from "@/lib/brief/schema";
import useBriefStore from "@/store/useBriefStore";
import TextInput from "./ui/TextInput";
import TextArea from "./ui/TextArea";
import Select from "./ui/Select";
import RadioGroup from "./ui/RadioGroup";
import CheckboxGroup from "./ui/CheckboxGroup";
import FileUpload from "./ui/FileUpload";
import DateInput from "./ui/DateInput";
import ServiceListInput, { type ServiceItem } from "./ui/ServiceListInput";

export default function FieldRenderer({ field }: { field: Field }) {
  const answers = useBriefStore((s) => s.answers);
  const filesMap = useBriefStore((s) => s.files);
  const updateAnswer = useBriefStore((s) => s.updateAnswer);
  const updateFiles = useBriefStore((s) => s.updateFiles);

  const value = answers[field.id];
  const set = (v: unknown) => updateAnswer(field.id, v);
  const label = field.label && !field.required ? `${field.label} (opcional)` : field.label;

  switch (field.type) {
    case "text":
      return <TextInput label={label} value={(value as string) || ""} onChange={set} placeholder={field.placeholder} />;
    case "textarea":
      return (
        <TextArea
          label={label}
          value={(value as string) || ""}
          onChange={set}
          placeholder={field.placeholder}
          maxLength={field.maxLength || 500}
        />
      );
    case "select":
      return <Select label={label} value={(value as string) || ""} onChange={set} options={field.options || []} />;
    case "radio":
      return <RadioGroup label={label} value={(value as string) || ""} onChange={set} options={field.options || []} />;
    case "checkboxes":
      return (
        <CheckboxGroup
          label={label}
          selected={(value as string[]) || []}
          onChange={set}
          options={field.options || []}
        />
      );
    case "date":
      return <DateInput label={label} value={(value as string) || ""} onChange={set} />;
    case "servicelist":
      return <ServiceListInput label={label} items={(value as ServiceItem[]) || []} onChange={set} placeholder={field.placeholder} />;
    case "file":
      return (
        <FileUpload
          label={label}
          description={field.description}
          accept={field.accept}
          files={filesMap[field.id] || []}
          onFilesChange={(items) => updateFiles(field.id, items)}
        />
      );
    default:
      return null;
  }
}
