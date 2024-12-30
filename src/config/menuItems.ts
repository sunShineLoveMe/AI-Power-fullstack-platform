export interface SubMenuItem {
  name: string;
  path: string;
  icon: string;
}

export interface MenuItem {
  name: string;
  path: string;
  icon: string;
  subItems?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  { 
    name: '仪表盘', 
    path: '/dashboard', 
    icon: 'dashboard'
  },
  
  {
    name: '全域画像',
    path: '/dashboard/portrait',
    icon: 'hub',
    subItems: [
      {
        name: '作者画像',
        path: '/dashboard/portrait/user',
        icon: 'person_search'
      }
    ]
  },
  {
    name: '商业价值',
    path: '/dashboard/business',
    icon: 'trending_up',
    subItems: [
      {
        name: '热词洞察',
        path: '/dashboard/business/hotwords',
        icon: 'trending_flat'
      }
    ]
  },
  {
    name: '智能营销',
    path: '/dashboard/marketing',
    icon: 'campaign',
    subItems: [
      {
        name: '辅助决策',
        path: '/dashboard/marketing/decision',
        icon: 'psychology'
      },
      {
        name: '营销推广',
        path: '/dashboard/marketing/promotion',
        icon: 'ads_click'
      },
      {
        name: '商机洞察',
        path: '/dashboard/marketing/opportunity',
        icon: 'lightbulb'
      }
    ]
  },
  {
    name: '智能体调度',
    path: '/dashboard/agent',
    icon: 'precision_manufacturing',
    subItems: [
      {
        name: '工作流编排',
        path: '/dashboard/agent/workflow',
        icon: 'account_tree'
      },
      {
        name: 'Agent管理',
        path: '/dashboard/agent/management',
        icon: 'smart_toy'
      },
      {
        name: '任务监控',
        path: '/dashboard/agent/monitor',
        icon: 'monitor'
      }
    ]
  },
  {
    name: '全维数据',
    path: '/dashboard/analytics',
    icon: 'data_exploration',
    subItems: [
      {
        name: '热词中心',
        path: '/dashboard/analytics/hotwords',
        icon: 'tag'
      },
      {
        name: '热度趋势',
        path: '/dashboard/analytics/trends',
        icon: 'trending_up'
      },
      {
        name: '关联分析',
        path: '/dashboard/analytics/correlation',
        icon: 'hub'
      }
    ]
  },
  { 
    name: '系统设置', 
    path: '/dashboard/settings', 
    icon: 'settings',
    subItems: [
      {
        name: '模型中心',
        path: '/dashboard/settings/models',
        icon: 'model_training'
      },
      {
        name: '算法中心',
        path: '/dashboard/settings/algorithms',
        icon: 'schema'
      },
      {
        name: '定时任务',
        path: '/dashboard/settings/scheduler',
        icon: 'schedule'
      }
    ]
  },
]; 