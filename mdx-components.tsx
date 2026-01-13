import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import {
  Home,
  Rocket,
  Code,
  CircleHelp,
  BarChart3,
  Cpu,
  Wrench,
  LineChart,
  Key,
  Shield,
  Clock,
  Globe,
  CreditCard,
  Settings,
  BookOpen,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
} from 'lucide-react';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Step,
    Steps,
    Tab,
    Tabs,
    Accordion,
    Accordions,
    File,
    Files,
    Folder,
    // Lucide icons for MDX usage
    Home,
    Rocket,
    Code,
    CircleHelp,
    BarChart3,
    Cpu,
    Wrench,
    LineChart,
    Key,
    Shield,
    Clock,
    Globe,
    CreditCard,
    Settings,
    BookOpen,
    Zap,
    AlertTriangle,
    CheckCircle,
    Info,
    ...components,
  };
}
