"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

import { HeartFilledIcon } from "@/components/icons";
import Image from "next/image";
import BuyMeBeerButton from "./BuyMeCoffeeButton";

export default function SupportModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="text-sm font-normal text-default-600 bg-default-100"
        startContent={<HeartFilledIcon className="text-danger" />}
        variant="flat"
        onPress={onOpen}
      >
        Support Me
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Support Me
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center items-center">
                    <Image
                      src={"/prompt-pay.jpg"}
                      alt="prompt-pay"
                      height={800}
                      width={300}
                    />
                  </div>
                  <BuyMeBeerButton />
                  <p className="text-center">ขอบคุณทุกการสนับสนุนครับ</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  X
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
