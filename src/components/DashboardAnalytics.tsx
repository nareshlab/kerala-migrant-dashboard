import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Heart, 
  Filter, 
  Download, 
  Search,
  TrendingUp,
  AlertTriangle,
  Activity,
  Bug,
  Shield,
  BarChart3,
  Globe,
  Clock,
  Timer,
  Target,
  PieChart,
  CheckCircle,
  Ambulance,
  AlertCircle
} from 'lucide-react';
import { useTranslation, T } from './TranslationProvider';

interface MigrantWorker {
  id: string;
  name: string;
  healthId: string;
  originState: string;
  originDistrict: string;
  keralDistrict: string;
  arrivalDate: string;
  healthStatus: 'Good' | 'At Risk' | 'Under Treatment' | 'Critical';
  occupation: string;
  employer: string;
  lastCheckup: string;
  vaccinationStatus: 'Complete' | 'Partial' | 'None';
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  emergencyContact: string;
}

interface DiseaseAlert {
  district: string;
  diseaseName: string;
  casesReported: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  lastUpdated: string;
  trend: 'Increasing' | 'Stable' | 'Decreasing';
  affectedAreas: string[];
  preventiveMeasures: string[];
}

interface InterStateDiseaseAlert {
  state: string;
  diseaseName: string;
  casesReported: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  lastUpdated: string;
  trend: 'Increasing' | 'Stable' | 'Decreasing';
  affectedDistricts: string[];
  riskToMigrants: 'Low' | 'Medium' | 'High' | 'Critical';
  preventiveMeasures: string[];
}

export function DashboardAnalytics() {
  const { translate } = useTranslation();
  
  // Mock migrant worker data
  const migrantWorkers: MigrantWorker[] = [
    {
      id: 'KL-MIG-2024-001234',
      name: 'Rajesh Kumar',
      healthId: 'KL-MIG-2024-001234',
      originState: 'Uttar Pradesh',
      originDistrict: 'Lucknow',
      keralDistrict: 'Ernakulam',
      arrivalDate: '2024-01-15',
      healthStatus: 'Good',
      occupation: 'Construction Worker',
      employer: 'ABC Construction Ltd',
      lastCheckup: '2024-01-25',
      vaccinationStatus: 'Complete',
      age: 32,
      gender: 'Male',
      bloodType: 'B+',
      emergencyContact: '+91-9876543210'
    },
    {
      id: 'KL-MIG-2024-001235',
      name: 'Priya Sharma',
      healthId: 'KL-MIG-2024-001235',
      originState: 'Rajasthan',
      originDistrict: 'Jaipur',
      keralDistrict: 'Thiruvananthapuram',
      arrivalDate: '2023-12-20',
      healthStatus: 'At Risk',
      occupation: 'Textile Worker',
      employer: 'Kerala Textiles Pvt Ltd',
      lastCheckup: '2024-01-20',
      vaccinationStatus: 'Partial',
      age: 28,
      gender: 'Female',
      bloodType: 'A+',
      emergencyContact: '+91-9876543211'
    },
    {
      id: 'KL-MIG-2024-001236',
      name: 'Mohammed Ali',
      healthId: 'KL-MIG-2024-001236',
      originState: 'West Bengal',
      originDistrict: 'Kolkata',
      keralDistrict: 'Idukki',
      arrivalDate: '2024-01-10',
      healthStatus: 'Good',
      occupation: 'Agricultural Worker',
      employer: 'Spice Gardens Kerala',
      lastCheckup: '2024-01-28',
      vaccinationStatus: 'Complete',
      age: 35,
      gender: 'Male',
      bloodType: 'O+',
      emergencyContact: '+91-9876543212'
    },
    {
      id: 'KL-MIG-2024-001237',
      name: 'Lakshmi Devi',
      healthId: 'KL-MIG-2024-001237',
      originState: 'Tamil Nadu',
      originDistrict: 'Chennai',
      keralDistrict: 'Kollam',
      arrivalDate: '2023-11-30',
      healthStatus: 'Under Treatment',
      occupation: 'Food Processing',
      employer: 'Fish Processing Unit',
      lastCheckup: '2024-01-27',
      vaccinationStatus: 'Complete',
      age: 26,
      gender: 'Female',
      bloodType: 'AB+',
      emergencyContact: '+91-9876543213'
    },
    {
      id: 'KL-MIG-2024-001238',
      name: 'Ravi Chandra',
      healthId: 'KL-MIG-2024-001238',
      originState: 'Andhra Pradesh',
      originDistrict: 'Visakhapatnam',
      keralDistrict: 'Kozhikode',
      arrivalDate: '2024-01-05',
      healthStatus: 'Good',
      occupation: 'Road Construction',
      employer: 'Kerala Infrastructure Ltd',
      lastCheckup: '2024-01-22',
      vaccinationStatus: 'Complete',
      age: 29,
      gender: 'Male',
      bloodType: 'B-',
      emergencyContact: '+91-9876543214'
    },
    {
      id: 'KL-MIG-2024-001239',
      name: 'Sunita Yadav',
      healthId: 'KL-MIG-2024-001239',
      originState: 'Bihar',
      originDistrict: 'Patna',
      keralDistrict: 'Ernakulam',
      arrivalDate: '2023-12-15',
      healthStatus: 'Good',
      occupation: 'Domestic Worker',
      employer: 'Domestic Services Co',
      lastCheckup: '2024-01-26',
      vaccinationStatus: 'Partial',
      age: 24,
      gender: 'Female',
      bloodType: 'A-',
      emergencyContact: '+91-9876543215'
    },
    {
      id: 'KL-MIG-2024-001240',
      name: 'Amit Singh',
      healthId: 'KL-MIG-2024-001240',
      originState: 'Delhi',
      originDistrict: 'New Delhi',
      keralDistrict: 'Palakkad',
      arrivalDate: '2024-01-18',
      healthStatus: 'At Risk',
      occupation: 'Security Guard',
      employer: 'Security Solutions Kerala',
      lastCheckup: '2024-01-24',
      vaccinationStatus: 'Complete',
      age: 31,
      gender: 'Male',
      bloodType: 'O-',
      emergencyContact: '+91-9876543216'
    },
    {
      id: 'KL-MIG-2024-001241',
      name: 'Kavitha Reddy',
      healthId: 'KL-MIG-2024-001241',
      originState: 'Telangana',
      originDistrict: 'Hyderabad',
      keralDistrict: 'Malappuram',
      arrivalDate: '2023-12-05',
      healthStatus: 'Good',
      occupation: 'IT Support',
      employer: 'Tech Park Kerala',
      lastCheckup: '2024-01-23',
      vaccinationStatus: 'Complete',
      age: 27,
      gender: 'Female',
      bloodType: 'B+',
      emergencyContact: '+91-9876543217'
    }
  ];

  // Mock disease surveillance data for Kerala districts
  const diseaseAlerts: DiseaseAlert[] = [
    {
      district: 'Ernakulam',
      diseaseName: 'Dengue Fever',
      casesReported: 45,
      severity: 'High',
      lastUpdated: '2024-01-28',
      trend: 'Increasing',
      affectedAreas: ['Kochi', 'Aluva', 'Perumbavoor'],
      preventiveMeasures: ['Remove stagnant water', 'Use mosquito nets', 'Medical screening']
    },
    {
      district: 'Thiruvananthapuram',
      diseaseName: 'Chikungunya',
      casesReported: 23,
      severity: 'Medium',
      lastUpdated: '2024-01-28',
      trend: 'Stable',
      affectedAreas: ['Neyyattinkara', 'Kazhakoottam'],
      preventiveMeasures: ['Vector control', 'Health awareness', 'Early detection']
    },
    {
      district: 'Kozhikode',
      diseaseName: 'H1N1 Influenza',
      casesReported: 12,
      severity: 'Medium',
      lastUpdated: '2024-01-27',
      trend: 'Decreasing',
      affectedAreas: ['Kozhikode City', 'Vatakara'],
      preventiveMeasures: ['Vaccination drive', 'Hand hygiene', 'Mask usage']
    },
    {
      district: 'Kollam',
      diseaseName: 'Hepatitis A',
      casesReported: 8,
      severity: 'Low',
      lastUpdated: '2024-01-26',
      trend: 'Stable',
      affectedAreas: ['Kollam City'],
      preventiveMeasures: ['Water quality monitoring', 'Food safety', 'Vaccination']
    },
    {
      district: 'Palakkad',
      diseaseName: 'Malaria',
      casesReported: 15,
      severity: 'Medium',
      lastUpdated: '2024-01-25',
      trend: 'Increasing',
      affectedAreas: ['Mannarkkad', 'Attappady'],
      preventiveMeasures: ['Bed nets', 'Indoor spraying', 'Early diagnosis']
    },
    {
      district: 'Idukki',
      diseaseName: 'Typhoid',
      casesReported: 6,
      severity: 'Low',
      lastUpdated: '2024-01-24',
      trend: 'Stable',
      affectedAreas: ['Thodupuzha', 'Kumily'],
      preventiveMeasures: ['Safe water supply', 'Sanitation', 'Vaccination']
    },
    {
      district: 'Malappuram',
      diseaseName: 'Measles',
      casesReported: 18,
      severity: 'High',
      lastUpdated: '2024-01-28',
      trend: 'Increasing',
      affectedAreas: ['Malappuram Town', 'Tirur', 'Perinthalmanna'],
      preventiveMeasures: ['Mass vaccination', 'Isolation', 'Contact tracing']
    }
  ];

  // Mock inter-state disease surveillance data
  const interStateDiseaseAlerts: InterStateDiseaseAlert[] = [
    {
      state: 'Tamil Nadu',
      diseaseName: 'Dengue Fever',
      casesReported: 156,
      severity: 'High',
      lastUpdated: '2024-01-28',
      trend: 'Increasing',
      affectedDistricts: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
      riskToMigrants: 'High',
      preventiveMeasures: ['Enhanced screening at borders', 'Vector control', 'Health camps']
    },
    {
      state: 'Karnataka',
      diseaseName: 'H1N1 Influenza',
      casesReported: 89,
      severity: 'Medium',
      lastUpdated: '2024-01-27',
      trend: 'Stable',
      affectedDistricts: ['Bangalore', 'Mysore', 'Mangalore'],
      riskToMigrants: 'Medium',
      preventiveMeasures: ['Vaccination drives', 'Health monitoring', 'Isolation protocols']
    },
    {
      state: 'Andhra Pradesh',
      diseaseName: 'Chikungunya',
      casesReported: 73,
      severity: 'Medium',
      lastUpdated: '2024-01-26',
      trend: 'Decreasing',
      affectedDistricts: ['Visakhapatnam', 'Vijayawada', 'Tirupati'],
      riskToMigrants: 'Medium',
      preventiveMeasures: ['Mosquito control', 'Health awareness', 'Early detection']
    },
    {
      state: 'Uttar Pradesh',
      diseaseName: 'Japanese Encephalitis',
      casesReported: 45,
      severity: 'High',
      lastUpdated: '2024-01-25',
      trend: 'Increasing',
      affectedDistricts: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
      riskToMigrants: 'Critical',
      preventiveMeasures: ['Vaccination campaigns', 'Vector surveillance', 'Health screening']
    },
    {
      state: 'West Bengal',
      diseaseName: 'Kala-azar',
      casesReported: 32,
      severity: 'Medium',
      lastUpdated: '2024-01-24',
      trend: 'Stable',
      affectedDistricts: ['Kolkata', 'Malda', 'Murshidabad'],
      riskToMigrants: 'Medium',
      preventiveMeasures: ['Sandfly control', 'Case detection', 'Treatment protocols']
    },
    {
      state: 'Bihar',
      diseaseName: 'Acute Encephalitis Syndrome',
      casesReported: 28,
      severity: 'High',
      lastUpdated: '2024-01-23',
      trend: 'Increasing',
      affectedDistricts: ['Patna', 'Muzaffarpur', 'Darbhanga'],
      riskToMigrants: 'High',
      preventiveMeasures: ['Nutritional support', 'Health education', 'Early treatment']
    },
    {
      state: 'Rajasthan',
      diseaseName: 'Scrub Typhus',
      casesReported: 19,
      severity: 'Medium',
      lastUpdated: '2024-01-22',
      trend: 'Stable',
      affectedDistricts: ['Jaipur', 'Jodhpur', 'Udaipur'],
      riskToMigrants: 'Low',
      preventiveMeasures: ['Mite control', 'Protective clothing', 'Health awareness']
    },
    {
      state: 'Delhi',
      diseaseName: 'Dengue Fever',
      casesReported: 67,
      severity: 'Medium',
      lastUpdated: '2024-01-28',
      trend: 'Decreasing',
      affectedDistricts: ['New Delhi', 'South Delhi', 'East Delhi'],
      riskToMigrants: 'Medium',
      preventiveMeasures: ['Water management', 'Community awareness', 'Case surveillance']
    },
    {
      state: 'Maharashtra',
      diseaseName: 'Zika Virus',
      casesReported: 12,
      severity: 'Low',
      lastUpdated: '2024-01-21',
      trend: 'Stable',
      affectedDistricts: ['Mumbai', 'Pune', 'Nagpur'],
      riskToMigrants: 'Low',
      preventiveMeasures: ['Mosquito control', 'Pregnancy monitoring', 'Lab surveillance']
    },
    {
      state: 'Gujarat',
      diseaseName: 'Crimean-Congo Hemorrhagic Fever',
      casesReported: 8,
      severity: 'Critical',
      lastUpdated: '2024-01-20',
      trend: 'Stable',
      affectedDistricts: ['Ahmedabad', 'Surat', 'Vadodara'],
      riskToMigrants: 'High',
      preventiveMeasures: ['Tick control', 'Livestock monitoring', 'Personal protection']
    }
  ];

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOriginState, setSelectedOriginState] = useState('all');
  const [selectedKeralaDistrict, setSelectedKeralaDistrict] = useState('all');
  const [selectedHealthStatus, setSelectedHealthStatus] = useState('all');
  const [selectedArrivalPeriod, setSelectedArrivalPeriod] = useState('all');
  
  // Disease surveillance filters
  const [selectedState, setSelectedState] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  // Get unique values for filter options
  const originStates = [...new Set(migrantWorkers.map(worker => worker.originState))].sort();
  const keralaDistricts = [...new Set(migrantWorkers.map(worker => worker.keralDistrict))].sort();
  const healthStatuses = ['Good', 'At Risk', 'Under Treatment', 'Critical'];

  // Filter migrant workers based on criteria
  const filteredMigrantWorkers = useMemo(() => {
    return migrantWorkers.filter(worker => {
      const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           worker.healthId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           worker.employer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesOriginState = selectedOriginState === 'all' || worker.originState === selectedOriginState;
      const matchesKeralaDistrict = selectedKeralaDistrict === 'all' || worker.keralDistrict === selectedKeralaDistrict;
      const matchesHealthStatus = selectedHealthStatus === 'all' || worker.healthStatus === selectedHealthStatus;
      
      let matchesArrivalPeriod = true;
      if (selectedArrivalPeriod !== 'all') {
        const arrivalDate = new Date(worker.arrivalDate);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - arrivalDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (selectedArrivalPeriod) {
          case 'last30':
            matchesArrivalPeriod = daysDiff <= 30;
            break;
          case 'last90':
            matchesArrivalPeriod = daysDiff <= 90;
            break;
          case 'last180':
            matchesArrivalPeriod = daysDiff <= 180;
            break;
          case 'older':
            matchesArrivalPeriod = daysDiff > 180;
            break;
        }
      }
      
      return matchesSearch && matchesOriginState && matchesKeralaDistrict && matchesHealthStatus && matchesArrivalPeriod;
    });
  }, [migrantWorkers, searchTerm, selectedOriginState, selectedKeralaDistrict, selectedHealthStatus, selectedArrivalPeriod]);

  // Filter inter-state disease alerts
  const filteredInterStateDiseases = useMemo(() => {
    return interStateDiseaseAlerts.filter(alert => {
      const matchesState = selectedState === 'all' || alert.state === selectedState;
      const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
      const matchesRiskLevel = selectedRiskLevel === 'all' || alert.riskToMigrants === selectedRiskLevel;
      
      return matchesState && matchesSeverity && matchesRiskLevel;
    });
  }, [interStateDiseaseAlerts, selectedState, selectedSeverity, selectedRiskLevel]);

  // Get unique states for filter
  const availableStates = [...new Set(interStateDiseaseAlerts.map(alert => alert.state))].sort();
  const severityLevels = ['Low', 'Medium', 'High', 'Critical'];
  const riskLevels = ['Low', 'Medium', 'High', 'Critical'];

  // Get state-wise statistics
  const stateWiseStats = useMemo(() => {
    const stats = originStates.map(state => {
      const workersFromState = migrantWorkers.filter(worker => worker.originState === state);
      return {
        state,
        total: workersFromState.length,
        good: workersFromState.filter(w => w.healthStatus === 'Good').length,
        atRisk: workersFromState.filter(w => w.healthStatus === 'At Risk').length,
        underTreatment: workersFromState.filter(w => w.healthStatus === 'Under Treatment').length,
        critical: workersFromState.filter(w => w.healthStatus === 'Critical').length
      };
    });
    return stats.sort((a, b) => b.total - a.total);
  }, [migrantWorkers, originStates]);

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'Good': return 'text-green-700 bg-green-100';
      case 'At Risk': return 'text-yellow-700 bg-yellow-100';
      case 'Under Treatment': return 'text-orange-700 bg-orange-100';
      case 'Critical': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-green-700 bg-green-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'High': return 'text-orange-700 bg-orange-100';
      case 'Critical': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-700 bg-green-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'High': return 'text-orange-700 bg-orange-100';
      case 'Critical': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Increasing': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'Decreasing': return <TrendingUp className="w-4 h-4 text-green-600 rotate-180" />;
      case 'Stable': return <Activity className="w-4 h-4 text-gray-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedOriginState('all');
    setSelectedKeralaDistrict('all');
    setSelectedHealthStatus('all');
    setSelectedArrivalPeriod('all');
  };

  const clearDiseaseFilters = () => {
    setSelectedState('all');
    setSelectedSeverity('all');
    setSelectedRiskLevel('all');
  };

  const exportData = () => {
    // Mock export functionality
    alert('Export functionality would download CSV/Excel file with current filtered data');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium text-gray-900">
            <T>Analytics & Disease Surveillance</T>
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            <T>Comprehensive data analysis of migrant workers and disease monitoring across Kerala and origin states</T>
          </p>
        </div>
        <Button onClick={exportData} className="kerala-dhs-button-primary">
          <Download className="w-4 h-4 mr-2" />
          <T>Export Data</T>
        </Button>
      </div>

      <Tabs defaultValue="migrants" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="migrants"><T>Migrant Data</T></TabsTrigger>
          <TabsTrigger value="kerala-diseases"><T>Kerala Diseases</T></TabsTrigger>
          <TabsTrigger value="interstate-diseases"><T>Interstate Monitor</T></TabsTrigger>
          <TabsTrigger value="overview"><T>Overview</T></TabsTrigger>
        </TabsList>

        {/* Migrant Workers Tab */}
        <TabsContent value="migrants" className="space-y-6">
          {/* Filters Section */}
          <Card className="kerala-dhs-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-blue-600" />
                <T>Filter Options</T>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium"><T>Search</T></label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Name, ID, or Employer"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium"><T>Origin State</T></label>
                  <Select value={selectedOriginState} onValueChange={setSelectedOriginState}>
                    <SelectTrigger>
                      <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all"><T>All States</T></SelectItem>
                      {originStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium"><T>Kerala District</T></label>
                  <Select value={selectedKeralaDistrict} onValueChange={setSelectedKeralaDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Districts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all"><T>All Districts</T></SelectItem>
                      {keralaDistricts.map(district => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium"><T>Health Status</T></label>
                  <Select value={selectedHealthStatus} onValueChange={setSelectedHealthStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all"><T>All Statuses</T></SelectItem>
                      {healthStatuses.map(status => (
                        <SelectItem key={status} value={status}><T>{status}</T></SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium"><T>Arrival Period</T></label>
                  <Select value={selectedArrivalPeriod} onValueChange={setSelectedArrivalPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Periods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all"><T>All Periods</T></SelectItem>
                      <SelectItem value="last30"><T>Last 30 days</T></SelectItem>
                      <SelectItem value="last90"><T>Last 90 days</T></SelectItem>
                      <SelectItem value="last180"><T>Last 6 months</T></SelectItem>
                      <SelectItem value="older"><T>Older than 6 months</T></SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">&nbsp;</label>
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    <T>Clear Filters</T>
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <span><T>Showing</T> {filteredMigrantWorkers.length} <T>of</T> {migrantWorkers.length} <T>workers</T></span>
              </div>
            </CardContent>
          </Card>

          {/* Workers Table */}
          <Card className="kerala-dhs-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <T>Migrant Workers Data</T>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead><T>Name & ID</T></TableHead>
                      <TableHead><T>Origin</T></TableHead>
                      <TableHead><T>Kerala Location</T></TableHead>
                      <TableHead><T>Arrival Date</T></TableHead>
                      <TableHead><T>Health Status</T></TableHead>
                      <TableHead><T>Occupation</T></TableHead>
                      <TableHead><T>Last Checkup</T></TableHead>
                      <TableHead><T>Vaccination</T></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMigrantWorkers.map((worker) => (
                      <TableRow key={worker.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{worker.name}</div>
                            <div className="text-sm text-gray-500">{worker.healthId}</div>
                            <div className="text-xs text-gray-400">{worker.age}y, {worker.gender}, {worker.bloodType}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{worker.originState}</div>
                            <div className="text-sm text-gray-500">{worker.originDistrict}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span>{worker.keralDistrict}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-sm">{new Date(worker.arrivalDate).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getHealthStatusColor(worker.healthStatus)}>
                            {worker.healthStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{worker.occupation}</div>
                            <div className="text-xs text-gray-500">{worker.employer}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{new Date(worker.lastCheckup).toLocaleDateString()}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={worker.vaccinationStatus === 'Complete' ? 'default' : 'secondary'}>
                            {worker.vaccinationStatus}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Kerala Disease Surveillance Tab */}
        <TabsContent value="kerala-diseases" className="space-y-6">
          <Card className="kerala-dhs-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="w-5 h-5 text-red-600" />
                <T>Kerala Disease Surveillance</T>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                <T>Real-time monitoring of disease outbreaks across Kerala districts</T>
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead><T>District</T></TableHead>
                      <TableHead><T>Disease</T></TableHead>
                      <TableHead><T>Cases</T></TableHead>
                      <TableHead><T>Severity</T></TableHead>
                      <TableHead><T>Trend</T></TableHead>
                      <TableHead><T>Affected Areas</T></TableHead>
                      <TableHead><T>Prevention</T></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {diseaseAlerts.map((alert, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{alert.district}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Bug className="w-4 h-4 text-red-500" />
                            <span className="font-medium">{alert.diseaseName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-lg font-semibold text-red-600">{alert.casesReported}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(alert.trend)}
                            <span className="text-sm">{alert.trend}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {alert.affectedAreas.slice(0, 2).map((area, i) => (
                              <div key={i} className="text-sm bg-gray-100 px-2 py-1 rounded text-center">
                                {area}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {alert.preventiveMeasures.slice(0, 2).map((measure, i) => (
                              <div key={i} className="text-xs bg-green-50 px-2 py-1 rounded border border-green-200">
                                {measure}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Kerala Disease Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="kerala-dhs-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><T>High Severity</T></p>
                    <p className="text-2xl font-semibold text-red-600">
                      {diseaseAlerts.filter(alert => alert.severity === 'High').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="kerala-dhs-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Activity className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><T>Total Cases</T></p>
                    <p className="text-2xl font-semibold text-orange-600">
                      {diseaseAlerts.reduce((sum, alert) => sum + alert.casesReported, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="kerala-dhs-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><T>Increasing</T></p>
                    <p className="text-2xl font-semibold text-yellow-600">
                      {diseaseAlerts.filter(alert => alert.trend === 'Increasing').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="kerala-dhs-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><T>Districts</T></p>
                    <p className="text-2xl font-semibold text-blue-600">
                      {new Set(diseaseAlerts.map(alert => alert.district)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Interstate Disease Surveillance Tab */}
        <TabsContent value="interstate-diseases" className="space-y-6">
          {/* Disease Filters */}
          <Card className="kerala-dhs-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-600" />
                <T>Interstate Disease Filters</T>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium"><T>State</T></label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all"><T>All States</T></SelectItem>
                      {availableStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium"><T>Severity</T></label>
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Severities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all"><T>All Severities</T></SelectItem>
                      {severityLevels.map(level => (
                        <SelectItem key={level} value={level}><T>{level}</T></SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium"><T>Risk to Migrants</T></label>
                  <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Risk Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all"><T>All Risk Levels</T></SelectItem>
                      {riskLevels.map(level => (
                        <SelectItem key={level} value={level}><T>{level}</T></SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">&nbsp;</label>
                  <Button variant="outline" onClick={clearDiseaseFilters} className="w-full">
                    <T>Clear Filters</T>
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <span><T>Showing</T> {filteredInterStateDiseases.length} <T>of</T> {interStateDiseaseAlerts.length} <T>disease alerts</T></span>
              </div>
            </CardContent>
          </Card>

          {/* Interstate Disease Table */}
          <Card className="kerala-dhs-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-600" />
                <T>Interstate Disease Monitoring</T>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                <T>Monitor diseases in migrant origin states for risk assessment</T>
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead><T>State</T></TableHead>
                      <TableHead><T>Disease</T></TableHead>
                      <TableHead><T>Cases</T></TableHead>
                      <TableHead><T>Severity</T></TableHead>
                      <TableHead><T>Risk Level</T></TableHead>
                      <TableHead><T>Trend</T></TableHead>
                      <TableHead><T>Affected Areas</T></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInterStateDiseases.map((alert, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-orange-600" />
                            <span className="font-medium">{alert.state}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Bug className="w-4 h-4 text-red-500" />
                            <span className="font-medium">{alert.diseaseName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-lg font-semibold text-red-600">{alert.casesReported}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(alert.riskToMigrants)}>
                            {alert.riskToMigrants}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(alert.trend)}
                            <span className="text-sm">{alert.trend}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {alert.affectedDistricts.slice(0, 2).map((district, i) => (
                              <div key={i} className="text-sm bg-gray-100 px-2 py-1 rounded text-center">
                                {district}
                              </div>
                            ))}
                            {alert.affectedDistricts.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{alert.affectedDistricts.length - 2} more
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Interstate Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="kerala-dhs-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><T>Critical Risk</T></p>
                    <p className="text-2xl font-semibold text-red-600">
                      {interStateDiseaseAlerts.filter(alert => alert.riskToMigrants === 'Critical').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="kerala-dhs-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Activity className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><T>Total Cases</T></p>
                    <p className="text-2xl font-semibold text-orange-600">
                      {interStateDiseaseAlerts.reduce((sum, alert) => sum + alert.casesReported, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="kerala-dhs-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><T>Increasing</T></p>
                    <p className="text-2xl font-semibold text-yellow-600">
                      {interStateDiseaseAlerts.filter(alert => alert.trend === 'Increasing').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="kerala-dhs-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Globe className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><T>States</T></p>
                    <p className="text-2xl font-semibold text-purple-600">
                      {new Set(interStateDiseaseAlerts.map(alert => alert.state)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* State Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="kerala-dhs-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <T>Migrant Worker Distribution by Origin State</T>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead><T>Origin State</T></TableHead>
                      <TableHead><T>Total Workers</T></TableHead>
                      <TableHead><T>Good Health</T></TableHead>
                      <TableHead><T>At Risk</T></TableHead>
                      <TableHead><T>Under Treatment</T></TableHead>
                      <TableHead><T>Critical</T></TableHead>
                      <TableHead><T>Health Rate</T></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stateWiseStats.map((stat) => (
                      <TableRow key={stat.state} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{stat.state}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-lg font-semibold">{stat.total}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className="text-green-700 bg-green-100">
                            {stat.good}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="text-yellow-700 bg-yellow-100">
                            {stat.atRisk}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="text-orange-700 bg-orange-100">
                            {stat.underTreatment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="text-red-700 bg-red-100">
                            {stat.critical}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${(stat.good / stat.total) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {Math.round((stat.good / stat.total) * 100)}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          <Alert className="border-blue-200 bg-blue-50">
            <Activity className="w-4 h-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <T>This overview shows comprehensive analytics for strategic healthcare planning and resource allocation across Kerala for migrant worker populations.</T>
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}