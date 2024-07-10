// model Task {
//   id          Int        @id @default(autoincrement()) @map("id")
//   title       String     @map("title") @db.VarChar(255)
//   description String     @map("description") @db.Text
//   status      TaskStatus @map("status")
//   dueDate     DateTime   @map("due_date")
//   comments    Comment[]
//   tags        Tag[]
//   file        File?
//   createdBy   User       @relation(fields: [createdById], references: [id])
//   createdById Int        @map("created_by_id")
//   createdAt   DateTime   @default(now()) @map("created_at")
//   updatedAt   DateTime   @updatedAt @map("updated_at")
//   logs        Log[]

import { TaskStatus } from '@prisma/client';

export class CreateTaskRequestDto {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  createdBy: number;
}
