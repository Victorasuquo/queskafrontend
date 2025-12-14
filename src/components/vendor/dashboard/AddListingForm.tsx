import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useVendor } from '@/contexts/VendorContext';
import { useToast } from '@/hooks/use-toast';
import { ListingType, VendorListing } from '@/lib/vendorData';
import LocationPicker from '../LocationPicker';
import { 
  Building2, 
  Calendar, 
  Utensils, 
  MapPin, 
  ArrowLeft, 
  ArrowRight,
  Upload,
  X,
  Check,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

interface AddListingFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

type Step = 'type' | 'details' | 'location' | 'pricing' | 'images' | 'documents' | 'review';

const AddListingForm = ({ onComplete, onCancel }: AddListingFormProps) => {
  const { vendor, addListing } = useVendor();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>('type');
  const [formData, setFormData] = useState({
    type: '' as ListingType,
    name: '',
    description: '',
    shortDescription: '',
    address: '',
    city: '',
    country: 'Nigeria',
    lat: 5.0377,
    lng: 7.9128,
    currency: 'NGN',
    amount: '',
    unit: '',
    images: [] as string[],
    documents: [] as { name: string; file: File | null }[],
    metadata: {} as Record<string, any>,
  });

  const listingTypes = [
    { value: 'hotel' as ListingType, icon: Building2, label: 'Hotel & Stays', description: 'Hotels, resorts, apartments, guesthouses' },
    { value: 'event' as ListingType, icon: Calendar, label: 'Events & Festivals', description: 'Concerts, cultural events, tours' },
    { value: 'restaurant' as ListingType, icon: Utensils, label: 'Restaurants & Dining', description: 'Restaurants, cafes, food experiences' },
    { value: 'activity' as ListingType, icon: MapPin, label: 'Activities & Tours', description: 'Adventure, sightseeing, experiences' },
  ];

  const steps: { key: Step; label: string }[] = [
    { key: 'type', label: 'Type' },
    { key: 'details', label: 'Details' },
    { key: 'location', label: 'Location' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'images', label: 'Images' },
    { key: 'documents', label: 'Documents' },
    { key: 'review', label: 'Review' },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, event.target!.result as string]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        setFormData(prev => ({
          ...prev,
          documents: [...prev.documents, { name: file.name, file }]
        }));
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].key);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].key);
    }
  };

  const handleSubmit = () => {
    const newListing: VendorListing = {
      id: `listing-${Date.now()}`,
      vendorId: vendor?.id || 'vendor-001',
      type: formData.type,
      name: formData.name,
      description: formData.description,
      shortDescription: formData.shortDescription,
      images: formData.images,
      location: {
        address: formData.address,
        city: formData.city,
        country: formData.country,
        lat: formData.lat,
        lng: formData.lng,
      },
      pricing: {
        currency: formData.currency,
        amount: parseFloat(formData.amount) || 0,
        unit: formData.unit,
      },
      metadata: formData.metadata,
      documents: formData.documents.map(d => ({
        name: d.name,
        url: '#',
        verified: false,
      })),
      status: 'pending',
      rating: 0,
      reviewCount: 0,
      bookings: 0,
      revenue: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addListing(newListing);
    toast({
      title: 'Listing Created!',
      description: 'Your listing has been submitted for verification.',
    });
    onComplete();
  };

  const getPricingUnit = () => {
    switch (formData.type) {
      case 'hotel': return 'per night';
      case 'event': return 'per person';
      case 'restaurant': return 'per person';
      case 'activity': return 'per person';
      default: return 'per unit';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New Listing</h1>
          <p className="text-muted-foreground">Create a new listing for travelers to discover</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
              index === currentStepIndex
                ? 'bg-vendor text-vendor-foreground'
                : index < currentStepIndex
                ? 'bg-vendor/20 text-vendor'
                : 'bg-muted text-muted-foreground'
            }`}>
              {index < currentStepIndex ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
              {step.label}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 ${index < currentStepIndex ? 'bg-vendor' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card>
        <CardContent className="p-6">
          {/* Step: Type Selection */}
          {currentStep === 'type' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">What type of listing?</h2>
                <p className="text-muted-foreground">Choose the category that best fits your offering</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {listingTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => {
                      setFormData({ ...formData, type: type.value, unit: type.value === 'hotel' ? 'per night' : 'per person' });
                      handleNext();
                    }}
                    className={`p-6 rounded-xl border-2 text-left transition-all hover:border-vendor hover:bg-vendor-muted ${
                      formData.type === type.value ? 'border-vendor bg-vendor-muted' : 'border-border'
                    }`}
                  >
                    <type.icon className="w-8 h-8 text-vendor mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step: Details */}
          {currentStep === 'details' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Basic Details</h2>
                <p className="text-muted-foreground">Tell travelers about your listing</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Listing Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Le Meridien Ibom Hotel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Input
                    id="shortDescription"
                    placeholder="A brief one-liner about your listing"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Full Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your listing in detail. What makes it special?"
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step: Location */}
          {currentStep === 'location' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Location</h2>
                <p className="text-muted-foreground">Where is your listing located?</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    placeholder="e.g., 123 Marina Road"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Uyo"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
              </div>
              {/* Interactive Map */}
              <div className="mt-6">
                <Label className="mb-3 block">Pin Location on Map</Label>
                <LocationPicker
                  lat={formData.lat}
                  lng={formData.lng}
                  onLocationChange={(lat, lng) => setFormData({ ...formData, lat, lng })}
                />
              </div>
            </div>
          )}

          {/* Step: Pricing */}
          {currentStep === 'pricing' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Pricing</h2>
                <p className="text-muted-foreground">Set your pricing for travelers</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="e.g., 85000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Per</Label>
                  <Input
                    id="unit"
                    placeholder={getPricingUnit()}
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </div>
              </div>
              <div className="p-4 bg-vendor-muted rounded-lg">
                <p className="text-sm text-vendor font-medium">
                  Preview: {formData.currency} {parseInt(formData.amount || '0').toLocaleString()} {formData.unit}
                </p>
              </div>
            </div>
          )}

          {/* Step: Images */}
          {currentStep === 'images' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Images</h2>
                <p className="text-muted-foreground">Upload high-quality images of your listing</p>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="image-upload"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-1">Click to upload images</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB each</p>
                </label>
              </div>
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img src={img} alt="" className="w-full h-24 object-cover rounded-lg" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step: Documents */}
          {currentStep === 'documents' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Verification Documents</h2>
                <p className="text-muted-foreground">Upload documents for verification (business registration, licenses, etc.)</p>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  multiple
                  className="hidden"
                  id="doc-upload"
                  onChange={handleDocumentUpload}
                />
                <label htmlFor="doc-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-1">Click to upload documents</p>
                  <p className="text-sm text-muted-foreground">PDF, DOC, DOCX, JPG, PNG</p>
                </label>
              </div>
              {formData.documents.length > 0 && (
                <div className="space-y-2">
                  {formData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-vendor" />
                        <span className="text-sm text-foreground">{doc.name}</span>
                      </div>
                      <button onClick={() => removeDocument(index)} className="text-muted-foreground hover:text-destructive">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step: Review */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Review Your Listing</h2>
                <p className="text-muted-foreground">Make sure everything looks correct</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Type</p>
                  <p className="font-medium text-foreground capitalize">{formData.type}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="font-medium text-foreground">{formData.name || 'Not set'}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="text-foreground">{formData.shortDescription || 'Not set'}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-medium text-foreground">
                    {formData.address ? `${formData.address}, ${formData.city}, ${formData.country}` : 'Not set'}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Pricing</p>
                  <p className="font-medium text-foreground">
                    {formData.currency} {parseInt(formData.amount || '0').toLocaleString()} {formData.unit}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Images</p>
                  <p className="font-medium text-foreground">{formData.images.length} uploaded</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Documents</p>
                  <p className="font-medium text-foreground">{formData.documents.length} uploaded</p>
                </div>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Your listing will be reviewed by our team before going live. This usually takes 24-48 hours.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button 
              variant="outline" 
              onClick={currentStep === 'type' ? onCancel : handleBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 'type' ? 'Cancel' : 'Back'}
            </Button>
            {currentStep === 'review' ? (
              <Button 
                onClick={handleSubmit}
                className="bg-vendor hover:bg-vendor-accent text-vendor-foreground"
              >
                Submit Listing
                <Check className="w-4 h-4 ml-2" />
              </Button>
            ) : currentStep !== 'type' && (
              <Button 
                onClick={handleNext}
                className="bg-vendor hover:bg-vendor-accent text-vendor-foreground"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddListingForm;
