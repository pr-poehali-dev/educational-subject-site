import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Test {
  id: number;
  title: string;
  subject: string;
  questions: number;
  completed: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  points: number;
}

const Index = () => {
  const [tests] = useState<Test[]>([
    {
      id: 1,
      title: 'Алгебра: Квадратные уравнения',
      subject: 'Математика',
      questions: 15,
      completed: 8,
      difficulty: 'medium'
    },
    {
      id: 2,
      title: 'Органическая химия',
      subject: 'Химия',
      questions: 20,
      completed: 0,
      difficulty: 'hard'
    },
    {
      id: 3,
      title: 'История России: XIX век',
      subject: 'История',
      questions: 12,
      completed: 12,
      difficulty: 'easy'
    },
    {
      id: 4,
      title: 'Английская грамматика',
      subject: 'Английский язык',
      questions: 18,
      completed: 5,
      difficulty: 'medium'
    }
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Написать эссе по литературе',
      description: 'Тема: "Образ Печорина в романе Лермонтова"',
      deadline: '25 окт',
      status: 'in-progress',
      points: 50
    },
    {
      id: 2,
      title: 'Решить задачи по физике',
      description: 'Механика: задачи 1-15 из учебника',
      deadline: '22 окт',
      status: 'pending',
      points: 30
    },
    {
      id: 3,
      title: 'Лабораторная работа по биологии',
      description: 'Изучение клеточного строения растений',
      deadline: '20 окт',
      status: 'completed',
      points: 40
    },
    {
      id: 4,
      title: 'Проект по информатике',
      description: 'Создать презентацию на тему "Искусственный интеллект"',
      deadline: '28 окт',
      status: 'pending',
      points: 60
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Выполнено';
      case 'in-progress': return 'В процессе';
      case 'pending': return 'Ожидает';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--secondary))] via-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Образовательная платформа
          </h1>
          <p className="text-lg text-muted-foreground">
            Учись эффективно с интерактивными тестами и заданиями
          </p>
        </header>

        <Tabs defaultValue="tests" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-14">
            <TabsTrigger value="tests" className="text-base flex items-center gap-2">
              <Icon name="Brain" size={20} />
              Тесты
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-base flex items-center gap-2">
              <Icon name="CheckSquare" size={20} />
              Задания
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {tests.map((test, index) => {
                const progress = (test.completed / test.questions) * 100;
                return (
                  <Card 
                    key={test.id} 
                    className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
                        <Badge variant="secondary" className="mb-2">
                          {test.subject}
                        </Badge>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getDifficultyColor(test.difficulty)}`} />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="HelpCircle" size={16} />
                        <span>{test.questions} вопросов</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-medium">{test.completed}/{test.questions}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:opacity-90 transition-opacity"
                        size="lg"
                      >
                        {test.completed === 0 ? 'Начать тест' : test.completed === test.questions ? 'Повторить' : 'Продолжить'}
                        <Icon name="ArrowRight" size={18} className="ml-2" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="p-8 bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.1)] border-2">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
                  <Icon name="Trophy" size={36} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Ваша статистика</h3>
                  <p className="text-muted-foreground mb-4">
                    Пройдено тестов: 3 из 4 • Средний балл: 87%
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Award" size={20} className="text-yellow-500" />
                      <span className="font-medium">12 достижений</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={20} className="text-green-500" />
                      <span className="font-medium">+15% за неделю</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {tasks.map((task, index) => (
                <Card 
                  key={task.id} 
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up border-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {task.description}
                      </p>
                    </div>
                    <Badge className={getStatusColor(task.status)}>
                      {getStatusText(task.status)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Icon name="Calendar" size={16} />
                        <span>{task.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1 font-medium text-[hsl(var(--primary))]">
                        <Icon name="Star" size={16} />
                        <span>{task.points} баллов</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--primary))] hover:opacity-90 transition-opacity"
                    size="lg"
                    disabled={task.status === 'completed'}
                  >
                    {task.status === 'completed' ? (
                      <>
                        <Icon name="Check" size={18} className="mr-2" />
                        Завершено
                      </>
                    ) : (
                      <>
                        {task.status === 'in-progress' ? 'Продолжить' : 'Начать'}
                        <Icon name="ArrowRight" size={18} className="ml-2" />
                      </>
                    )}
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-br from-[hsl(var(--secondary)/0.1)] to-[hsl(var(--primary)/0.1)] border-2">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--primary))] flex items-center justify-center">
                  <Icon name="Target" size={36} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Прогресс по заданиям</h3>
                  <p className="text-muted-foreground mb-4">
                    Выполнено: 1 из 4 • Набрано баллов: 40 из 180
                  </p>
                  <div className="space-y-2">
                    <Progress value={(40/180) * 100} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      До следующего уровня: 60 баллов
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
