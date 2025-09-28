import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileText, Calendar, Pill, Activity, Download, Plus, AlertCircle, CheckCircle, Upload, X } from 'lucide-react';
import { useTranslation, T } from './TranslationProvider';

interface HealthRecord {
  id: string;
  date: string;
  type: string;
  provider: string;
  diagnosis: string;
  treatment: string;
  status: 'completed' | 'ongoing' | 'followup';
  prescription?: string[];
}

interface Vaccination {
  id: string;
  vaccine: string;
  date: string;
  nextDue?: string;
  provider: string;
  batch: string;
}

export function HealthRecords() {
  const { translate } = useTranslation();
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [newRecord, setNewRecord] = useState({
    type: '',
    provider: '',
    diagnosis: '',
    treatment: '',
    status: 'completed' as const,
    prescription: ''
  });

  // Mock health records data
  const healthRecords: HealthRecord[] = [
    {
      id: '1',
      date: '2024-12-01',
      type: 'General Checkup',
      provider: 'Government General Hospital',
      diagnosis: 'Routine health screening - Normal',
      treatment: 'Preventive care counseling',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-11-15',
      type: 'Emergency Visit',
      provider: 'Community Health Center',
      diagnosis: 'Respiratory infection',
      treatment: 'Antibiotics, rest',
      status: 'completed',
      prescription: ['Amoxicillin 500mg - 7 days', 'Cough syrup - 5 days']
    },
    {
      id: '3',
      date: '2024-10-28',
      type: 'Follow-up',
      provider: 'Migrant Worker Health Post',
      diagnosis: 'Work-related back strain',
      treatment: 'Physiotherapy sessions',
      status: 'ongoing',
      prescription: ['Pain relief gel', 'Exercise routine']
    }
  ];

  const vaccinations: Vaccination[] = [
    {
      id: '1',
      vaccine: 'COVID-19 Booster',
      date: '2024-09-15',
      nextDue: '2025-09-15',
      provider: 'Primary Health Center',
      batch: 'COV-2024-789'
    },
    {
      id: '2',
      vaccine: 'Hepatitis B',
      date: '2024-08-10',
      provider: 'Government Hospital',
      batch: 'HEP-2024-456'
    },
    {
      id: '3',
      vaccine: 'Tetanus',
      date: '2024-06-20',
      nextDue: '2034-06-20',
      provider: 'Community Health Center',
      batch: 'TET-2024-123'
    }
  ];

  const vitalSigns = [
    { name: 'Blood Pressure', value: '120/80 mmHg', status: 'normal', date: '2024-12-01' },
    { name: 'Heart Rate', value: '72 bpm', status: 'normal', date: '2024-12-01' },
    { name: 'Temperature', value: '98.6°F', status: 'normal', date: '2024-12-01' },
    { name: 'Weight', value: '68 kg', status: 'normal', date: '2024-12-01' },
    { name: 'Blood Sugar', value: '95 mg/dL', status: 'normal', date: '2024-11-15' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'ongoing': return 'bg-blue-100 text-blue-700';
      case 'followup': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitRecord = () => {
    // Here you would typically send the data to your backend
    console.log('New record:', newRecord);
    console.log('Uploaded files:', uploadedFiles);
    
    // Reset form
    setNewRecord({
      type: '',
      provider: '',
      diagnosis: '',
      treatment: '',
      status: 'completed',
      prescription: ''
    });
    setUploadedFiles([]);
    setShowAddForm(false);
    
    // Show success message
    alert('Health record added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2>My Health Records</h2>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              <T>Add Record</T>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle><T>Add New Health Record</T></DialogTitle>
              <DialogDescription>
                <T>Fill in the details below to add a new health record and upload supporting documents.</T>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="record-type"><T>Record Type</T></Label>
                  <Select value={newRecord.type} onValueChange={(value) => setNewRecord(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={translate("Select record type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Checkup"><T>General Checkup</T></SelectItem>
                      <SelectItem value="Emergency Visit"><T>Emergency Visit</T></SelectItem>
                      <SelectItem value="Follow-up"><T>Follow-up</T></SelectItem>
                      <SelectItem value="Specialist Consultation"><T>Specialist Consultation</T></SelectItem>
                      <SelectItem value="Laboratory Test"><T>Laboratory Test</T></SelectItem>
                      <SelectItem value="Imaging Study"><T>Imaging Study</T></SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status"><T>Status</T></Label>
                  <Select value={newRecord.status} onValueChange={(value: any) => setNewRecord(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed"><T>Completed</T></SelectItem>
                      <SelectItem value="ongoing"><T>Ongoing</T></SelectItem>
                      <SelectItem value="followup"><T>Follow-up Required</T></SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="provider"><T>Healthcare Provider</T></Label>
                <Input 
                  id="provider"
                  value={newRecord.provider}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, provider: e.target.value }))}
                  placeholder={translate("Enter healthcare provider name")}
                />
              </div>
              
              <div>
                <Label htmlFor="diagnosis"><T>Diagnosis/Findings</T></Label>
                <Textarea 
                  id="diagnosis"
                  value={newRecord.diagnosis}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, diagnosis: e.target.value }))}
                  placeholder={translate("Enter diagnosis or findings")}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="treatment"><T>Treatment/Recommendations</T></Label>
                <Textarea 
                  id="treatment"
                  value={newRecord.treatment}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, treatment: e.target.value }))}
                  placeholder={translate("Enter treatment details or recommendations")}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="prescription"><T>Prescription (optional)</T></Label>
                <Textarea 
                  id="prescription"
                  value={newRecord.prescription}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, prescription: e.target.value }))}
                  placeholder={translate("Enter prescription details (one per line)")}
                  rows={2}
                />
              </div>
              
              <div>
                <Label><T>Upload Documents</T></Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">
                    <T>Upload medical reports, test results, or prescriptions</T>
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    <T>Supports PDF, JPG, PNG files up to 10MB each</T>
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" asChild>
                      <span><T>Choose Files</T></span>
                    </Button>
                  </Label>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <Label><T>Uploaded Files:</T></Label>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSubmitRecord}
                  disabled={!newRecord.type || !newRecord.provider || !newRecord.diagnosis}
                >
                  <T>Save Record</T>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  <T>Cancel</T>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="records" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="summary">Health Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <div className="grid gap-4">
            {healthRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{record.type}</h3>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{record.provider}</p>
                      <p className="text-sm">{record.diagnosis}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedRecord(record)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{record.type}</DialogTitle>
                            <DialogDescription>
                              Medical record from {record.provider} on {new Date(record.date).toLocaleDateString()}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Diagnosis</h4>
                              <p className="text-sm">{record.diagnosis}</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Treatment</h4>
                              <p className="text-sm">{record.treatment}</p>
                            </div>
                            {record.prescription && (
                              <div>
                                <h4 className="font-medium mb-2">Prescription</h4>
                                <ul className="text-sm space-y-1">
                                  {record.prescription.map((med, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                      <Pill className="w-4 h-4 text-blue-600" />
                                      {med}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-4">
          <div className="grid gap-4">
            {vaccinations.map((vaccine) => (
              <Card key={vaccine.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-medium">{vaccine.vaccine}</h3>
                      <p className="text-sm text-muted-foreground">{vaccine.provider}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Received: {new Date(vaccine.date).toLocaleDateString()}
                        </div>
                        {vaccine.nextDue && (
                          <div className="flex items-center gap-1 text-orange-600">
                            <AlertCircle className="w-4 h-4" />
                            Next due: {new Date(vaccine.nextDue).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Batch: {vaccine.batch}</p>
                    </div>
                    <Badge variant="outline">
                      Verified
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vitalSigns.map((vital, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{vital.name}</h3>
                      <p className="text-lg">{vital.value}</p>
                      <p className="text-xs text-muted-foreground">
                        Last measured: {new Date(vital.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(vital.status)}
                      <Activity className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">Last checkup</span>
                    <Badge variant="outline">3 days ago</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">Vaccinations up to date</span>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">Ongoing treatments</span>
                    <Badge>1 active</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Health Goals Progress</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Annual health screenings</span>
                      <span>2/2 completed</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Required vaccinations</span>
                      <span>3/3 current</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Preventive care visits</span>
                      <span>1/2 completed</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Upcoming Reminders</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Annual physical exam</p>
                      <p className="text-xs text-muted-foreground">Due in 3 months</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Pill className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Prescription refill</p>
                      <p className="text-xs text-muted-foreground">Due in 2 weeks</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}