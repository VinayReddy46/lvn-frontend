import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "@/utils/fakeData.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

// Basic information schema
const basicInfoSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Organization name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  website: z
    .string()
    .url({ message: "Must be a valid URL" })
    .optional()
    .or(z.literal("")),
  email: z.string().email({ message: "Must be a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
});

// Address schema
const addressSchema = z.object({
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  city: z
    .string()
    .min(2, { message: "City name must be at least 2 characters" }),
  state: z
    .string()
    .min(2, { message: "State name must be at least 2 characters" }),
  zip: z.string().min(5, { message: "Zip code must be at least 5 characters" }),
  country: z
    .string()
    .min(2, { message: "Country name must be at least 2 characters" }),
});

// Categories schema
const categoriesSchema = z.object({
  categories: z
    .array(z.string())
    .min(1, { message: "Select at least one category" }),
});

// Merge all schemas for the complete form
const formSchema = z.object({
  ...basicInfoSchema.shape,
  ...addressSchema.shape,
  ...categoriesSchema.shape,
});

// FormValues defined as z.infer<typeof formSchema>

const steps = [
  { id: "basic-info", title: "Basic Information" },
  { id: "address", title: "Address" },
  { id: "categories", title: "Categories" },
  { id: "review", title: "Review" },
];

const CreateOrganization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    categories: [],
  });
  const navigate = useNavigate();

  // Set up form based on current step
  const getSchemaForCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return basicInfoSchema;
      case 1:
        return addressSchema;
      case 2:
        return categoriesSchema;
      default:
        return formSchema;
    }
  };

  const form = useForm({
    resolver: zodResolver(getSchemaForCurrentStep()),
    defaultValues: {
      name: formData.name || "",
      description: formData.description || "",
      website: formData.website || "",
      email: formData.email || "",
      phone: formData.phone || "",
      address: formData.address || "",
      city: formData.city || "",
      state: formData.state || "",
      zip: formData.zip || "",
      country: formData.country || "",
      categories: formData.categories || [],
    },
  });

  // Handle form submission for each step
  const onSubmit = (values) => {
    const updatedData = { ...formData, ...values };
    setFormData(updatedData);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission
      toast.success("Organization created successfully!");
      navigate("/admin");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderBasicInfoForm = () => (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization Name</FormLabel>
            <FormControl>
              <Input placeholder="Community Helpers" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about your organization..."
                className="resize-none min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide a brief description of your organization's mission and
              activities
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://example.org"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="contact@example.org"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="(123) 456-7890"
                  className="pl-10"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const renderAddressForm = () => (
    <>
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street Address</FormLabel>
            <FormControl>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="123 Main St" className="pl-10" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="San Francisco" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State/Province</FormLabel>
              <FormControl>
                <Input placeholder="California" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip/Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="94105" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="United States" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );

  const renderCategoriesForm = () => (
    <>
      <FormField
        control={form.control}
        name="categories"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel>Categories</FormLabel>
              <FormDescription>
                Select all categories that apply to your organization
              </FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category) => (
                <FormField
                  key={category}
                  control={form.control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={category}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(category)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, category])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== category
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {category}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Organization Name
            </p>
            <p className="text-base">{formData.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-base">{formData.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p className="text-base">{formData.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Website</p>
            <p className="text-base">{formData.website || "N/A"}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Description
          </p>
          <p className="text-base">{formData.description}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Street Address
            </p>
            <p className="text-base">{formData.address}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">City</p>
            <p className="text-base">{formData.city}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              State/Province
            </p>
            <p className="text-base">{formData.state}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Zip/Postal Code
            </p>
            <p className="text-base">{formData.zip}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Country</p>
            <p className="text-base">{formData.country}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {formData.categories?.map((category) => (
            <span key={category} className="px-2 py-1 bg-muted text-sm rounded">
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfoForm();
      case 1:
        return renderAddressForm();
      case 2:
        return renderCategoriesForm();
      case 3:
        return renderReviewStep();
      default:
        return null;
    }
  };

  return (
    <div className="container py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Organization</h1>
        <p className="text-muted-foreground mt-1">
          Set up your organization to start posting volunteer opportunities
        </p>
      </div>

      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2
              ${
                index < currentStep
                  ? "bg-primary text-primary-foreground border-primary"
                  : index === currentStep
                  ? "bg-primary/10 text-primary border-primary"
                  : "bg-muted text-muted-foreground border-muted-foreground/30"
              }
            `}
            >
              {index < currentStep ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span
              className={`text-sm mt-2 ${
                index === currentStep ? "font-medium" : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className="hidden sm:block w-12 h-[2px] bg-muted-foreground/30 mx-2" />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>
            {currentStep === 0 &&
              "Provide basic information about your organization"}
            {currentStep === 1 && "Where is your organization located?"}
            {currentStep === 2 &&
              "Select categories that represent your organization's focus areas"}
            {currentStep === 3 &&
              "Review your organization details before submission"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderCurrentStep()}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            {currentStep < steps.length - 1 ? (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                <Building2 className="mr-2 h-4 w-4" /> Create Organization
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateOrganization;
