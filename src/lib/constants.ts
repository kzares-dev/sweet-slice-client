import { ChartPie, Home, NotebookPen } from 'lucide-svelte'

export const navigation = [
    {
        title: 'Home',
        Icon: Home, 
        path: '/'
    },
    {
        title: 'Overview',
        Icon: ChartPie,
        path: '/overview',
    },
    {
        title: 'Sketchs',
        Icon: NotebookPen,
        path: '/sketchs',
    }
    
]

export const steps = [
    {
        step: 1,
        title: 'Create a new sketch',
        description: 'You can have any sketchs you want'
    },
    {
        step: 2,
        title: 'Set as monthly plan',
        description: 'Set the definitive sketch as main plan.'
    },
    {
        step: 3,
        title: 'Update the plan',
        description: 'You can keep updating the plan and change it anytime',
    },
    {
        step: 4,
        title: 'Enjoy a better planification',
        description: 'Thats all, manage your monthly expenses easly',
    }

]