"use client"; 

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Reusable Form Component
const DynamicForm = ({ fields, onSubmit }) => {
  // Create schema dynamically
  const schema = z.object(
    fields.reduce((acc, field) => {
      acc[field.name] = field.validation;
      return acc;
    }, {})
  );

  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            control={form.control}
            render={({ field: fieldProps }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "select" ? (
                    <Select onValueChange={fieldProps.onChange} value={fieldProps.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "checkbox" ? (
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={fieldProps.value} onCheckedChange={fieldProps.onChange} />
                      <label>{field.placeholder}</label>
                    </div>
                  ) : (
                    <Input type={field.type} {...fieldProps} placeholder={field.placeholder} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="sm:col-span-2 flex gap-5 justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default DynamicForm;
