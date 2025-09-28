import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  User, 
  Eye, 
  Share,
  Bookmark,
  TrendingUp,
  Heart,
  Shield,
  AlertTriangle,
  Pill,
  Activity
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation, T } from './TranslationProvider';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  image: string;
  tags: string[];
  featured: boolean;
}

export function MedicalAwareness() {
  const { translate } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: '1',
      title: translate('Workplace Safety Guidelines for Migrant Workers'),
      excerpt: translate('Essential safety practices and protocols for construction and industrial work environments.'),
      content: translate('Comprehensive guide covering personal protective equipment, hazard identification, emergency procedures, and workers\' rights regarding workplace safety.'),
      category: 'Safety',
      author: 'Dr. Priya Menon',
      date: '2024-12-01',
      readTime: '5 min',
      views: 1250,
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrcGxhY2UlMjBzYWZldHl8ZW58MXx8fHwxNzU3MjQ4Nzg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Safety', 'Prevention', 'Guidelines'],
      featured: true
    },
    {
      id: '2',
      title: translate('Understanding Your Health Insurance Rights in Kerala'),
      excerpt: translate('Navigate health insurance coverage, claims, and entitlements available to migrant workers.'),
      content: translate('Detailed explanation of health insurance policies, claim procedures, covered services, and how to access healthcare services through insurance.'),
      category: 'Insurance',
      author: 'Adv. Ravi Kumar',
      date: '2024-11-28',
      readTime: '7 min',
      views: 980,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBpbnN1cmFuY2V8ZW58MXx8fHwxNzU3MjQ4Nzg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Insurance', 'Rights', 'Coverage'],
      featured: false
    },
    {
      id: '3',
      title: translate('Preventive Healthcare: Regular Checkups Save Lives'),
      excerpt: translate('Learn about the importance of regular health screenings and preventive care measures.'),
      content: translate('Guide to understanding different types of health screenings, their frequency, and how preventive care can detect health issues early.'),
      category: 'Prevention',
      author: 'Dr. Sarah Joseph',
      date: '2024-11-25',
      readTime: '6 min',
      views: 1100,
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmV2ZW50aXZlJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NTcyNDg3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Prevention', 'Checkups', 'Health'],
      featured: true
    },
    {
      id: '4',
      title: translate('Mental Health Support for Migrant Workers'),
      excerpt: translate('Resources and strategies for maintaining mental wellbeing while working away from home.'),
      content: translate('Comprehensive mental health guide addressing common challenges faced by migrant workers, coping strategies, and available support services.'),
      category: 'Mental Health',
      author: 'Dr. Anjali Nair',
      date: '2024-11-20',
      readTime: '8 min',
      views: 890,
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGh8ZW58MXx8fHwxNzU3MjQ4Nzg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Mental Health', 'Support', 'Wellbeing'],
      featured: false
    },
    {
      id: '5',
      title: translate('COVID-19 Vaccination and Booster Guidelines'),
      excerpt: translate('Latest information on COVID-19 vaccines, boosters, and safety protocols.'),
      content: translate('Up-to-date guidance on COVID-19 vaccination schedules, booster shots, side effects, and workplace safety measures.'),
      category: 'Vaccination',
      author: 'Dr. Mohanan K.',
      date: '2024-11-15',
      readTime: '4 min',
      views: 1400,
      image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNjaW5hdGlvbnxlbnwxfHx8fDE3NTcyNDg3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['COVID-19', 'Vaccination', 'Safety'],
      featured: true
    },
    {
      id: '6',
      title: translate('Nutrition Guidelines for Manual Workers'),
      excerpt: translate('Dietary recommendations for maintaining energy and health during physical work.'),
      content: translate('Nutritional guide tailored for manual workers, including meal planning, hydration, and supplements for optimal health and performance.'),
      category: 'Nutrition',
      author: 'Nutritionist Lakshmi Das',
      date: '2024-11-10',
      readTime: '6 min',
      views: 750,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb258ZW58MXx8fHwxNzU3MjQ4Nzg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Nutrition', 'Diet', 'Energy'],
      featured: false
    }
  ];

  const categories = ['all', 'Safety', 'Insurance', 'Prevention', 'Mental Health', 'Vaccination', 'Nutrition'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(article => article.featured);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Safety': return <Shield className="w-4 h-4" />;
      case 'Insurance': return <Bookmark className="w-4 h-4" />;
      case 'Prevention': return <Heart className="w-4 h-4" />;
      case 'Mental Health': return <Activity className="w-4 h-4" />;
      case 'Vaccination': return <Pill className="w-4 h-4" />;
      case 'Nutrition': return <TrendingUp className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h2><T>Medical Awareness & Resources</T></h2>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={translate("Search articles, guides, and resources...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category === 'all' ? <T>All Categories</T> : <T>{category}</T>}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="featured" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured"><T>Featured Articles</T></TabsTrigger>
          <TabsTrigger value="all"><T>All Resources</T></TabsTrigger>
          <TabsTrigger value="categories"><T>By Category</T></TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(article.category)}
                    <Badge variant="secondary" className="text-xs">{translate(article.category)}</Badge>
                    <Badge variant="outline" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <T>Featured</T>
                    </Badge>
                  </div>
                  
                  <h3 className="font-medium mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-3 h-3" />
                      {article.views}
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => setSelectedArticle(article)}>
                        <T>Read More</T>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh]">
                      <DialogHeader>
                        <DialogTitle>{article.title}</DialogTitle>
                        <DialogDescription>
                          <T>By</T> {article.author} • {article.readTime} <T>read</T>
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[60vh]">
                        <div className="space-y-4">
                          <div className="aspect-video w-full overflow-hidden rounded-lg">
                            <ImageWithFallback
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="prose prose-sm max-w-none">
                            <p>{article.content}</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {article.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {translate(tag)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(article.category)}
                        <Badge variant="secondary" className="text-xs">{translate(article.category)}</Badge>
                        {article.featured && (
                          <Badge variant="outline" className="text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            <T>Featured</T>
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(article.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {article.views}
                          </div>
                        </div>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedArticle(article)}>
                              <T>Read Article</T>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh]">
                            <DialogHeader>
                              <DialogTitle>{article.title}</DialogTitle>
                              <DialogDescription>
                                <T>By</T> {article.author} • {article.readTime} <T>read</T>
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="max-h-[60vh]">
                              <div className="space-y-4">
                                <div className="aspect-video w-full overflow-hidden rounded-lg">
                                  <ImageWithFallback
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="prose prose-sm max-w-none">
                                  <p>{article.content}</p>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {article.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {translate(tag)}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.filter(cat => cat !== 'all').map((category) => {
              const categoryArticles = articles.filter(article => article.category === category);
              return (
                <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCategory(category)}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {getCategoryIcon(category)}
                      <h3 className="font-medium"><T>{category}</T></h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {categoryArticles.length} <T>articles available</T>
                    </p>
                    <div className="space-y-2">
                      {categoryArticles.slice(0, 2).map((article) => (
                        <div key={article.id} className="text-xs p-2 bg-muted rounded">
                          <p className="line-clamp-1">{article.title}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}